const hodServices = require('../services/hod');


exports.login = async(req, res)=>{
    try {
        const result = await hodServices.login(req.body);
        req.session.user = {
            id: result._id,
            username: result.username,
            type: 'hod'
        }
        res.status(200).send({message: "logged in.", data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}

exports.getStudents = async(req, res)=>{
    if(!req.params.semester ) return res.status(400).send({message: 'semester not defined in parameters'});
    try {
        const result = await hodServices.getStudents(req.params.semester, req.session.user.id);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}

exports.getHistory = async(req, res)=>{
    if(!req.params.studentId) return res.status(400).send({message: 'student id not defined in parameters'});
    try {
        const result = await hodServices.getHistory(req.params.studentId);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}

exports.approve = async(req, res)=>{
    if(!req.params.leaveId) return res.status(400).send({message: 'leave id not defined in parameters'});
    try {
        const result = await hodServices.approve(req.params.leaveId);
        console.log(result)
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}

exports.reject = async(req, res)=>{
    console.log(req.params)
    if(!req.params.leaveId) return res.status(400).send({message: 'leave id not defined in parameters'});
    try {
        const result = await hodServices.rejectLeave(req.params.leaveId);
        console.log(result)
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}
