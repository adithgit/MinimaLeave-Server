const leave = require('../models/leave');
const Student = require('../models/student');

exports.login = (studentDetails)=>{
    return new Promise((resolve, reject)=>{
        Student.findOne({username: studentDetails.username}, (err, student)=>{
            if(err || !parent) return reject(err || 'username not valid');
            Parent.comparePassword(studentDetails.password, student.password, (err, valid)=>{
                if(err || !valid) return reject(err || 'password incorrect');
                resolve(student);
            })
        })
    })
}

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