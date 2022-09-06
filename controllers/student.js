const studentServices = require('../services/student');

exports.apply = (req, res)=>{
    if(!req.params.studentId) return res.status(400).send({message: 'student id  not defined in parameters'});
    try {
        const result = studentServices.apply(rq.params.studentId);
        res.status(200).send({message: 'leave apply success', data: result});
    } catch (e) {
        res.status(500).send({message: e});
    }
}


exports.getHistory = (req, res)=>{
    if(!req.params.studentId) return res.status(400).send({message: 'student id not defined in parameters'});
    try {
        const result = studentServices.getHistory(rq.params.studentId);
        res.status(200).send({message: 'leave get success', data: result});
    } catch (e) {
        res.status(500).send({message: e});
    }
}