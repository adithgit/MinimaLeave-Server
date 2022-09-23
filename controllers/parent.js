const parentServices = require('../services/parent');


exports.login = async (req, res)=>{
    try {
        const result = await parentServices.login(req.body);
        req.session.user = {
            username: result.username,
            type: 'parent'
        }
        res.status(200).send({message: 'logged in', data: result}); 
    } catch (e) {
        res.status(401).send({message: e.toString()});
    }
}

exports.getStudents = async (req, res)=>{
    if(!req.params.parentId) return res.status(400).send({message: 'parentId not defined in parameters'});
    try {
        const result = await parentServices.getStudents(req.params.parentId);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e.toString()});
    }
}


exports.getHistory = async (req, res)=>{
    if(!req.params.studentId) return res.status(400).send({message: 'student id not defined in parameters'});
    try {
        console.log(req.params.studentId);
        const result = await parentServices.getHistory(req.params.studentId);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e.toString()});
    }
}

exports.approve = async (req, res)=>{
    if(!req.params.leaveId) return res.status(400).send({message: 'leave id not defined in parameters'});
    try {
        const result = await parentServices.approve(req.params.leaveId);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e.toString()});
    }
}

exports.addChild = async (req, res)=>{
    try {
        const result = await parentServices.addChild(req.body.username, req.body.parent);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e.toString()});
    }
}

exports.reject = async (req, res)=>{
    try {
        const result = await parentServices.reject(req.params.leaveId);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e.toString()});
    }
}