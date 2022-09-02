const hodServices = require('../services/hod');

exports.getStudents = async(req, res)=>{
    if(!req.params.semester || !req.params.department) return res.status(400).send({message: 'semester or department not defined in parameters'});
    try {
        const result = await hodServices.getStudents(req.params.semester, req.params.department);
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
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}