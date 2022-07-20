const express = require('express');
const router = express.Router();
const hodManage = require('./models/hod');
const leave = require('./models/leave');
const parentManage = require('./models/parent');
const studentManage = require('./models/student');
Student = require("./models/student"),
    Parent = require("./models/parent"),
    Hod = require("./models/hod");


router.get('/apply', (req, res) => {
    if (!req.session.user) return res.json({ authenticated: false }).end();
    const studentId = req.session.user._id;
    const { subject, from, to, days } = req.body;
    studentManage.findById(studentId, (err, student)=>{
        if(err) return res.json({ authenticated:false }).end();
        new leave({
            subject,
            from,
            to,
            days,
            stud:{
                id:studentId,
                username:student.username
            }
        }).save((err, result)=>{
            if(err) return res.status(400).json({ applied: false }).end();
        });

    })
    res.status(200).json({ applied: true }).end();
})

module.exports = router;
