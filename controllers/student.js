const studentServices = require('../services/student');

exports.login = async (req, res) => {
    try {
        const result = await studentServices.login(req.body);
        req.session.user = {
            username: result.username,
            type: 'student'
        }
        res.status(200).send({ message: 'logged in', data: result });
    } catch (e) {
        res.status(401).send({ message: e });
    }
}

exports.apply = (req, res) => {
    // if (!req.session.user) return res.status(400).send({ message: 'student not logged in' });
    const leaveDetails = req.body;
    leaveDetails.username = 'b';
    studentServices.applyLeave(leaveDetails).then((result) => {
        res.status(200).send({ message: 'leave apply success', data: result });
    }).catch((err) => {
        res.status(500).send({ message: err });
    });
}


exports.getHistory = async (req, res) => {
    if (!req.params.studentId) return res.status(400).send({ message: 'student id not defined in parameters' });
    try {
        console.log(req.params.studentId)
        const result = await studentServices.getHistory(req.params.studentId);
        res.status(200).send({ message: 'leave get success', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}