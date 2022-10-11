const Student = require('../models/student');
const Leave = require('../models/leave');
const Hod = require('../models/hod');
const leave = require('../models/leave');

exports.login = (credentials) => {
    return new Promise((resolve, reject) => {
        Hod.findOne({ username: credentials.username }, (err, hod) => {
            if (err || !hod) return reject(err || "username not valid")
            Hod.comparePassword(credentials.password, hod.password, (err, valid) => {
                if (err || !valid) return reject(err || "password not valid");
                hod = hod.toJSON();
                hod.type = 'hod';
                delete hod.password;
                resolve(hod);
            })
        })
    })
}

exports.getStudents = (semester, id) => {
    return new Promise((resolve, reject) => {
        Hod.findById({ _id: id }, (err, hod) => {
            if (err || !hod) return reject(err || 'No hod found.')
            const department = hod.department;
            semester = parseInt(semester)
            Student.find({ department: department, semester: semester }, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        })
    });
}

exports.getHistory = (studentId) => {
    return new Promise((resolve, reject) => {
        Leave.find({ student: studentId }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

exports.approve = async (leaveId) => {
    return new Promise((resolve, reject) => {
        Leave.findOne({ _id: leaveId }, async (err, result) => {
            if (err) return reject(err);
            const update = await handleLeave(leaveId);
            resolve(update);
        })
    })
}

const handleLeave = (leaveId) => {
    return new Promise((resolve, reject) => {
        Leave.findOne({ _id: leaveId }, (err, result) => {
            if (err || !result) return reject(err || 'No leave found')
            if (result.parentstatus == 'denied') {
                Leave.updateOne({ _id: leaveId }, { $set: { hodstatus: 'denied', finalstatus: 'denied' } }, (err, result) => {
                    if (err) return reject(err);
                    resolve(result)
                });
            } else if (result.parentstatus == 'approved') {
                Leave.updateOne({ _id: leaveId }, { $set: { hodstatus: 'approved', finalstatus: 'approved' } }, (err, result) => {
                    if (err) return reject(err);
                    resolve(result)
                });
            } else {
                Leave.updateOne({ _id: leaveId }, { $set: { hodstatus: 'approved'} }, (err, result) => {
                    if (err) return reject(err);
                    resolve(result)
                });
            }
        })
    })
}

exports.rejectLeave = (leaveId) => {
    return new Promise((resolve, reject) => {
        Leave.findOne({ _id: leaveId }, (err, result) => {
            Leave.updateOne({ _id: leaveId }, { $set: { hodstatus: 'denied', finalstatus: 'denied' } }, (err, result) => {
                if (err) return reject(err);
                resolve(result)
            });
        })
    })
}