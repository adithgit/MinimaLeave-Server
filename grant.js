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
    if (req.session.role === 'student') return res.status(403).json({ authenticated: false }).end();
    let granted = false;
    if (req.session.role === 'hod') granted = approveHod(req.body.leaveId);
    if (req.session.role === 'parent') granted = approveParent(req.body.leaveId);
    res.status(200).json({ granted: granted }).end();
})

const approveHod = (leaveId) => {
    leave.updateOne({ _id: leaveId }, { $set: { hodstatus: 'approved' } },(err, res) => {
        if (err) {
            return false;
        }
        leave.findOne({ _id: leaveId },(err, res) => {
            
            if (res.parentstatus == 'approved') {
                leave.updateOne({ _id: leaveId }, { $set: { finalstatus: 'approved' } },(err, res)=>{
                    if(err){
                        return false;
                    }
                });
            }
            else if (res.parentstatus == 'declined') {
                leave.updateOne({ _id: leaveId }, { $set: { finalstatus: 'denied' } },(err, res)=>{
                    if(err){
                        return false;
                    }
                });
            }
        })
        return true;
    })
}

const approveParent = (leaveId) => {
    leave.updateOne({ _id: leaveId }, { $set: { parentstatus: 'approved' } }, (err, res) => {
        if (err) {
            return false;
        }
        leave.findOne({ _id: leaveId },(err, res) => {
            if(err){
                console.log("error finding leave application");
            }
            console.log(res);
            if (res.hodstatus == 'approved') {
                console.log("approved");
                leave.updateOne({ _id: leaveId }, { $set: { finalstatus: 'approved' } },(err, res)=>{
                    if(res){
                        console.log(err);
                    }
                });
            }
            else if (res.hodstatus ==='declined') {
                leave.updateOne({ _id: leaveId }, { $set: { finalstatus: 'denied' } });
            }
        })
        return true;
    })
}

module.exports = router;

