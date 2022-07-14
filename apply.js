const express = require('express');
const router = express.Router();
const hodManage = require('./models/hod');
const leave = require('./models/leave');
const parentManage = require('./models/parent');
const studentManage = require('./models/student');
Student = require("./models/student"),
    Parent = require("./models/parent"),
    Hod = require("./models/hod"),
    Leave = require("./models/leave");

    router.get('/apply', (req, res)=>{
        if(!req.session.user) res.json({authenticated:false}).end();
        
    })