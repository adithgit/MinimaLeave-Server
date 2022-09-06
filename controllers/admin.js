const express = require("express");
const router = express.router;
const adminServices = require("../services/admin");

// Private Routes

// router.post('/add/hod', adminControl.createHod);
// router.post('/add/student', adminControl.createStudent);
// router.post('/add/parent', adminControl.addParent);
// router.post('/remove/hod', adminControl.removeHod);
// router.post('/remove/student', adminControl.removeStudent);
// router.post('/remove/parent', adminControl.removeParent);


exports.register = async (req, res)=>{
    try{
        if(!req.body.ADMIN_KEY) throw new Error();

        const key = req.body.ADMIN_KEY;
        const result = await adminServices.createAdmin(req.body, key);
        res.status(200).send({message: 'admin created', data: result});
    }
    catch(e){
        res.status(500).send({message: 'cannot create admin', data: e.toString()});
    }
}


exports.login = async (req, res)=>{
    try{
        const result = await adminServices.loginAdmin(req.body);
        res.status(200).send({message: 'admin logged in', data: result});
    }
    catch(e){
        res.status(500).send({message: 'login error', data: e});
    }
}

