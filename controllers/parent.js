const parentServices = require('../services/parent');

exports.getStudents = async (req, res)=>{
    if(!req.params.parentId) return res.status(400).send({message: 'parentId not defined in parameters'});
    try {
        const result = await parentServices.getStudents(req.params.parentId);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}


exports.getHistory = async (req, res)=>{
    if(!req.params.studentId) return res.status(400).send({message: 'student id not defined in parameters'});
    try {
        const result = await parentServices.getHistory(req.params.studentId);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}

exports.approve = async (req, res)=>{
    if(!req.params.leaveId) return res.status(400).send({message: 'leave id not defined in parameters'});
    try {
        const result = await parentServices.approve(leaveId);
        res.status(200).send({data: result}); 
    } catch (e) {
        res.status(401).send({message: e});
    }
}