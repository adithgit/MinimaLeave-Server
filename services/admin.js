const Admin = require('../models/admin');
const Hod = require('../models/hod');
const Parent = require('../models/parent');

exports.createAdmin = (adminDetails, key) => {
    return new Promise((resolve, reject) => {
        if (key != 'adminkey') return reject("Admin key not valid");
        Admin.find({ username: adminDetails.username }, (err, result) => {
            if (err || result.length != 0) return reject(err || 'username already exists');
        })
        new Admin(adminDetails).save((err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

exports.loginAdmin = (loginDetails) => {
    return new Promise((resolve, reject) => {
        Admin.findOne({ username: loginDetails.username }, (err, admin) => {
            if (err || !admin) return reject('username invalid');
            Admin.comparePassword(loginDetails.password, admin.password, (err, valid) => {
                if (err || !valid) return reject('password incorrect');
                resolve(admin);
            })
        })
    })
}

exports.addHod = (hodDetails) => {
    return new Promise((resolve, reject) => {
        Hod.findOne({username: hodDetails.username}, (err, hod)=>{
            if(err || hod) return reject("username already exists.");
        })
        new Hod(hodDetails).save((err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

exports.addParent = (parentDetails) => {
    return new Promise((resolve, reject) => {
        Parent.findOne({username: parentDetails.username}, (err, parent)=>{
            if(err || parent) return reject("username already exists")
        });
        new Parent(parentDetails).save((err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

exports.addStudent = (studentDetails) => {
    return new Promise((resolve, reject) => {
        Student.findOne({username: studentDetails.username}, (err, student)=>{
            if(err || student) return reject("username already exists")
        });
        new Student(studentDetails).save((err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}


exports.removeStudent = (username) => {
    return new Promise((resolve, reject) => {
        Student.deleteOne({ username: username }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    })
}


exports.removeHod = (username) => {
    return new Promise((resolve, reject) => {
        Hod.deleteOne({ username: username }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    })
}


exports.removeParent = (username) => {
    return new Promise((resolve, reject) => {
        Parent.deleteOne({ username: username }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    })
}



