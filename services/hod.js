const Student = require('../models/student');
const Leave = require('../models/leave');
const Hod = require('../models/hod');

exports.login = (credentials)=>{
    return new Promise((resolve, reject)=>{
        Hod.findOne({username: credentials.username}, (err, hod)=>{
            if(err || !hod) return reject(err || "username not valid")
            Hod.comparePassword(credentials.password, hod.password, (err, valid)=>{
                if(err || !valid) return reject(err || "password not valid");
                resolve(hod);
            })
        })
    })
}

exports.getStudents = (semester, department) => {
    return new Promise((resolve, reject) => {
        Student.find({ semester: semester, department: department }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

exports.getHistory = (studentId) => {
    return new Promise((resolve, reject) => {
        Leave.find({ stud: studentId }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

exports.approve = (leaveId) => {
    return new Promise((resolve, reject) => {
        Leave.findOne({ _id: leaveId }, async(err, result) => {
            if(err) return reject(err);
            if(result.parentStatus != 'pending') await handleLeave(leaveId);
            resolve('approved');
        })
    })
}

const handleLeave = (leaveId)=>{
    return new Promise((resolve, reject)=>{
        Leave.findOne({_id: leaveId}, (err, result)=>{
            if(result.parentstatus == 'denied'){
                Leave.updateOne({_id: leaveId}, {$set: {hodstatus: 'denied'}}, (err, result)=>{
                    if(err) return reject(err);
                    resolve(result)
                });
            }else{
                Leave.updateOne({_id: leaveId}, {$set: {hodstatus: 'approved'}}, (err, result)=>{
                    if(err) return reject(err);
                    resolve(result)
                });
            }
        })
    })
}