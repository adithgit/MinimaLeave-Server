const leave = require('../models/leave');
const Student = require('../models/student');

exports.login = (studentDetails)=>{
    return new Promise((resolve, reject)=>{
        Student.findOne({username: studentDetails.username}, (err, student)=>{
            if(err || !student) return reject(err || 'username not valid');
            Parent.comparePassword(studentDetails.password, student.password, (err, valid)=>{
                if(err || !valid) return reject(err || 'password incorrect');
                resolve(student);
            })
        })
    })
}

exports.getHistory = (studId)=>{
    return new Promise((resolve, reject)=>{
        leave.find({student: studId}, (err, result)=>{
            if(err) return reject(err);
            console.log(result)
            resolve(result);
        })
    })
}

exports.applyLeave = (leaveDetails)=>{
    return new Promise((resolve, reject)=>{
        console.log(leaveDetails)
        Student.findOne({username: leaveDetails.username}, (err, student)=>{
            if(err || !student) return reject(err)
            console.log(student);
            leaveDetails.student = student.id;
            new leave(leaveDetails).save((err, result)=>{
                if(err || !result ) return reject(err);
                Student.updateOne({username: leaveDetails.username}, {$push: {leaves: result._id}}, (err, result)=>{
                    if(err) return reject(err);
                });
                resolve(result);
            })
        })
    })
}