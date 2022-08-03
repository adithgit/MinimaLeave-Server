const express = require('express');
const router = express.Router();
const hodManage = require('./models/hod');
const leave = require('./models/leave');
const parentManage = require('./models/parent');
const studentManage = require('./models/student');
Student = require("./models/student"),
    Parent = require("./models/parent"),
    Hod = require("./models/hod");


router.get('/grant', (req, res) => {
    if (!req.session.user) return res.status(403).json({ authenticated: false }).end();
    if(req.session.role === 'student') return res.status(403).json({ authenticated: false }).end();
    let granted = false;
    if(req.session.role === 'hod') granted = approveHod(req.body.leaveId);
    if(req.session.role === 'parent')  granted = approveParent(req.body.leaveId);
    res.status(200).json({ granted:granted }).end();
})

const approveHod = (leaveId)=>{
 leave.updateOne({_id:leaveId},{$set:{hodstatus:'approved'}}).then((err, res)=>{
    if(err){
        return false;
    }
    leave.findOne({_id:leaveId}).then((err, res)=>{
        if(res.parentstatus === 'approved'){
            leave.updateOne({_id:leaveId},{$set:{finalstatus:'approved'}});   
        }
        else if( res.parentstatus === 'declined'){
            leave.updateOne({_id:leaveId},{$set:{finalstatus:'denied'}});
        }
    })
    return true;
 })
}

const approveParent = (leaveId)=>{
    leave.updateOne({_id:leaveId},{$set:{parentstatus:'approved'}}).then((err, res)=>{
        if(err){
            return false;
        }
        leave.findOne({_id:leaveId}).then((err, res)=>{
            if(res.hodstatus === 'approved'){
                leave.updateOne({_id:leaveId},{$set:{finalstatus:'approved'}});  
            }
            else if( res.hodstatus === 'declined'){
                leave.updateOne({_id:leaveId},{$set:{finalstatus:'denied'}});
            }
        })
        return true;
     })
}

module.exports = router;

