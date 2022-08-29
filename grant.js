const express = require('express');
const router = express.Router();
const hodManage = require('./models/hod');
const leave = require('./models/leave');
const parentManage = require('./models/parent');
const studentManage = require('./models/student');
Student = require("./models/student"),
    Parent = require("./models/parent"),
    Hod = require("./models/hod");


router.get('/grant', async (req, res) => {
    if (!req.session.user) return res.status(403).json({ authenticated: false }).end();
    if (req.session.role === 'student') return res.status(403).json({ authenticated: false }).end();
    let granted = false;
    if (req.session.role === 'hod') granted = await approveHod(req.body.leaveId);
    if (req.session.role === 'parent') granted = await approveParent(req.body.leaveId);
    console.log(granted);
    res.status(200).json({ granted: granted }).end();
})

const approveHod = (leaveId) => {
    return new Promise((resolve, reject) => {
        leave.updateOne({ _id: leaveId }, { $set: { hodstatus: 'approved' } }, (err, res) => {
            if (err) {
                console.log("error here");
                return resolve(false);
            }
            leave.findOne({ _id: leaveId }, (err, res) => {
                if (err) return resolve(false);
                if (res.parentstatus == 'approved') {
                    leave.updateOne({ _id: leaveId }, { $set: { finalstatus: 'approved' } }, (err, res) => {
                        if (err) resolve(false);
                        return resolve(true);
                    });
                }
                else if (res.parentstatus == 'declined') {
                    leave.updateOne({ _id: leaveId }, { $set: { finalstatus: 'denied' } }, (err, res) => {
                        if (err) resolve(false);
                        return resolve(true);
                    });
                }
            })
            resolve(true);
        })
    })
}

const approveParent = (leaveId) => {
    return new Promise((resolve, reject) => {

        leave.updateOne({ _id: leaveId }, { $set: { parentstatus: 'approved' } }, (err, res) => {
            if (err) return resolve(false);
            leave.findOne({ _id: leaveId }, (err, res) => {
                if (err) return resolve(false);
                if (res.hodstatus == 'approved') {
                    leave.updateOne({ _id: leaveId }, { $set: { finalstatus: 'approved' } }, (err, res) => {
                        if (err) return resolve(false);
                        return resolve(true);;
                    });
                }
                else if (res.hodstatus === 'declined') {
                    leave.updateOne({ _id: leaveId }, { $set: { finalstatus: 'denied' } }, (err, res) => {
                        if (err) return resolve(false);
                        return resolve(true);
                    });
                }
            })
            resolve(true);
        })

    })
}

module.exports = router;

