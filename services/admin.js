const Admin = require('../models/admin');



exports.createAdmin = (adminDetails, key)=>{
    return new Promise((resolve, reject)=>{
        if(key != 'adminkey') return reject("Admin key not valid");
        Admin.find({username: adminDetails.username}, (err, result)=>{
            if(err || result.length != 0) return reject(err || 'username already exists');
        })
        new Admin(adminDetails).save((err, result)=>{
            if(err) return reject(err);
            resolve(result);
        })
    })
}

exports.loginAdmin = (loginDetails)=>{
    return new Promise((resolve, reject)=>{
        Admin.findOne({username: loginDetails.username}, (err, admin)=>{
            if(err || !admin) return reject('username invalid');
            Admin.comparePassword(loginDetails.password, admin.password, (err, valid)=>{
                if(err || !valid) return reject('password incorrect');
                resolve(admin);
            })
        })
    })
}