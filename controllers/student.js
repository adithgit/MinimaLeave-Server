const studentServices = require('../services/student');

exports.login = async (req, res) => {
    try {
        const result = await studentServices.login(req.body);
        req.session.user = {
            id: result._id,
            username: result.username,
            type: 'student'
        }
        console.log(result);
        res.status(200).send({ message: 'logged in', data: result });
    } catch (e) {
        res.status(401).send({ message: e });
    }
}

exports.apply = (req, res) => {
    // if (!req.session.user) return res.status(400).send({ message: 'student not logged in' });
    const leaveDetails = req.body;
    leaveDetails.username = req.session.user.username
    studentServices.applyLeave(leaveDetails).then((result) => {
        res.status(200).send({ message: 'leave apply success', data: result });
    }).catch((err) => {
        res.status(500).send({ message: err });
    });
}


exports.getHistory = async (req, res) => {
    if (!req.session.user) return res.status(400).send({ message: 'Not logged in' });
    try {
        console.log(req.params.studentId)
        const result = await studentServices.getHistory(req.session.user.id);
        res.status(200).send({ message: 'leave get success', data: result });
    } catch (e) {
        res.status(500).send({ message: e.toString() });
    }
}