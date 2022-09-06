const leave = require('../models/leave');
const Student = require('../models/student');

exports.getHistory = (studId)=>{
    return new Promise((resolve, reject)=>{
        leave.find({stud: studId}, (err, result)=>{
            if(err) return reject(err);
            resolve(result);
        })
    })
}

exports.applyLeave = (leaveDetails)=>{
    return new Promise((resolve, reject)=>{
        new leave(leaveDetails).save((err, result)=>{
            if(err) return reject(err);
            resolve(result);
        })
    })
}