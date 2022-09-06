const Student = require('../models/student');
const Leave = require('../models/leave');
const Parent = require('../models/parent');

exports.login = (parentDetails)=>{
    return new Promise((resolve, reject)=>{
        Parent.findOne({username: parentDetails.username}, (err, parent)=>{
            if(err || !parent) return reject(err || 'username not valid');
            Parent.comparePassword(parentDetails.password, parent.password, (err, valid)=>{
                if(err || !valid) return reject(err || 'password incorrect');
                resolve(parent);
            })
        })
    })
}

exports.getStudents = (parentId)=>{
    return new Promise((resolve, reject)=>{
        Student.find({guardian: parentId}, (err, result)=>{
            if(err) return reject(err);
            resolve(result);
        })
    })
}

exports.getHistory = (studentId)=>{
    return new Promise((resolve, reject)=>{
        Leave.find({stud: studentId}, (err, result)=>{
            if(err) return reject(err);
            resolve(result);
        })
    })
}

exports.approve = (leaveId) => {
    return new Promise((resolve, reject) => {
        Leave.findOne({ _id: leaveId }, async(err, result) => {
            if(err) return reject(err);
            if(result.hodStatus != 'pending') await handleLeave(leaveId);
            resolve('approved');
        })
    })
}

const handleLeave = (leaveId)=>{
    return new Promise((resolve, reject)=>{
        Leave.findOne({_id: leaveId}, (err, result)=>{
            if(result.hodstatus == 'denied'){
                Leave.updateOne({_id: leaveId}, {$set: {parentstatus: 'denied'}}, (err, result)=>{
                    if(err) return reject(err);
                });
            }else{
                Leave.updateOne({_id: leaveId}, {$set: {parentstatus: 'approved'}}, (err, result)=>{
                    if(err) return reject(err);
                });
            }
            resolve('done');
        })
    })
}