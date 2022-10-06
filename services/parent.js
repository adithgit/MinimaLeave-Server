const Student = require('../models/student');
const Leave = require('../models/leave');
const Parent = require('../models/parent');

exports.login = (parentDetails)=>{
    return new Promise((resolve, reject)=>{
        Parent.findOne({username: parentDetails.username}, (err, parent)=>{
            if(err || !parent) return reject(err || 'username not valid');
            Parent.comparePassword(parentDetails.password, parent.password, (err, valid)=>{
                if(err || !valid) return reject(err || 'password incorrect');
                parent = parent.toJSON();
                parent.type = 'parent';
                delete parent.password;
                resolve(parent);
            })
        })
    })
}


exports.getHistory = (studentId)=>{
    return new Promise((resolve, reject)=>{
        Leave.find({student: studentId}, (err, result)=>{
            if(err) return reject(err);
            resolve(result);
        })
    })
}

exports.reject = (leaveId) => {
    return new Promise((resolve, reject) => {
        Leave.findOne({ _id: leaveId }, async(err, result) => {
            if(err) return reject(err);
            if(result.hodStatus != 'pending') await this.rejectLeave(leaveId);
            resolve('rejected');
        })
    })
}


exports.rejectLeave = (leaveId)=>{
    return new Promise((resolve, reject)=>{
        Leave.findOne({_id: leaveId}, (err, result)=>{
            if(err || !result) return reject(err || "leave Id doesn't match.");
                Leave.updateOne({_id: leaveId}, {$set: {parentstatus: 'denied', finalstatus:'denied'}}, (err, result)=>{
                    if(err) return reject(err);
                    resolve(result)
                });
        })
    })
}

exports.approve = (leaveId) => {
    return new Promise((resolve, reject) => {
        Leave.findOne({ _id: leaveId }, async(err, result) => {
            if(err) return reject(err);
            const update =  await handleLeave(leaveId);
            console.log(update)
            resolve(update);
        })
    })
}



const handleLeave = (leaveId)=>{
    return new Promise((resolve, reject)=>{
        Leave.findOne({_id: leaveId}, (err, result)=>{
            if(err) return reject(err)
            if(result.hodstatus == 'denied'){
                Leave.updateOne({_id: leaveId}, {$set: {parentstatus: 'denied', finalstatus: 'denied'}}, (err, result)=>{
                    if(err) return reject(err);
                    return resolve(result)
                });
            }else 
            if(result.hodstatus == 'approved'){
                Leave.updateOne({_id: leaveId}, {$set: {parentstatus: 'approved', finalstatus: 'approved'}}, (err, result)=>{
                    if(err) return reject(err);
                    return resolve(result)
                });
            }else{
                Leave.updateOne({_id: leaveId}, {$set: {parentstatus: 'approved'}}, (err, result)=>{
                    if(err) return reject(err);
                    return resolve(result)
                });
            }
        })
    })
}

exports.addChild = (username, parent)=>{
    return new Promise((resolve, reject)=>{
        Student.findOne({username: username}, (err, student)=>{
            if(err || !student)  return reject(err || 'student does not exist.');
            Parent.updateOne({_id: parent}, {$push: {student: student._id}}, (err, result)=>{
                if(err) return reject(err);
                console.log(result)
                resolve(result);
            })
        })
    })
}

exports.getStudents = (parentId)=>{
    console.log(parentId);
    return new Promise((resolve, reject)=>{
        Parent.findOne({_id: parentId}, (err, parent)=>{
            if(err || !parent ) return reject(err || 'Cannot fetch children.');
            const children = parent.student;
            Student.find({_id : {$in: children}}, (err, result)=>{
                if(err) return reject(err || 'No children under.');
                resolve(result);
                console.log(result)
            })
        })
    }) 
}