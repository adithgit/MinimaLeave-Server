const express = require('express');
const router = express.Router();
const hodManage = require('./models/hod');
const parentManage = require('./models/parent');
const studentManage = require('./models/student');
Student = require("./models/student"),
    Parent = require("./models/parent"),
    Hod = require("./models/hod"),
    Leave = require("./models/leave");


router.post('/login', (req, res) => {
    const { role, username, password } = req.body;
    if (role === "hod") {
        hodManage.getUserByUsername(username, (err, user) => {
            if (!user || err) {
                res.status(401);
                return res.end();
            }
            hodManage.comparePassword(password, user.password, (err, passwordFound) => {
                if (!passwordFound) {
                    res.status(401);
                    return res.end();
                }
                req.session.user = user;
                req.session.role = 'hod';
                res.status(200);
                res.send({ authenticated: true });
            })
        });
    }
    else if (role === "parent") {
        parentManage.getUserByUsername(username, (err, user) => {
            if (!user || err) {
                res.status(401);
                return res.end();
            }
            parentManage.comparePassword(password, user.password, (err, passwordFound) => {
                if (!passwordFound) {
                    res.status(401);
                    return res.end();
                }
                req.session.user = user; 
                req.session.role = 'parent';               
                res.status(200);
                res.send({ authenticated: true });
            })
        });
    }
    else if (role === "student") {
        studentManage.getUserByUsername(username, (err, user) => {
            if (!user || err) {
                res.status(401);
                return res.end();
            }
            studentManage.comparePassword(password, user.password, (err, passwordFound) => {
                if (!passwordFound) {
                    res.status(401);
                    return res.end();
                }
                req.session.user = user;
                req.session.role = 'student';
                res.status(200);
                res.send({ authenticated: true });
            })
        });
    }
    else {
        res.status(404);
        res.end();
    }
})

router.post('/signup', (req, res) => {
    const { role } = req.body;
    if (role === 'hod') {
        const { name, username, password, department, image } = req.body;
        // Check if hod already exists, if not create one
        hodManage.getUserByUsername(username, (err, result) => {
            if (err || result) {
                // Hod already exists
                res.send({ userExists: true });
                res.end();
            }
            else {
                // Doesn't exists
                hodManage.createHod(new Hod({
                    name,
                    type: 'hod',
                    username,
                    password,
                    department,
                    image
                }), (err) => {
                    if (err) {
                        console.log("Cannot create HOD");
                        res.status(500);
                        res.send({ created: false });
                        return;
                    }
                    console.log("Created HOD");
                    res.status(200);
                    res.send({ created: true })
                });
            }
        });
    }
    else if (role === 'parent') {
        const { name, username, password, image } = req.body;
        parentManage.getUserByUsername(username, (err, result) => {
            if (err || result) {
                // Hod already exists
                res.send({ userExists: true });
                res.end();
            }
            else {
                // Doesn't exists
                parentManage.createParent(new Parent({
                    name,
                    type: 'parent',
                    username,
                    password,
                    image
                }), (err) => {
                    if (err) {
                        console.log("Cannot create Parent");
                        res.status(500);
                        res.send({ created: false });
                        return;
                    }
                    console.log("Created Parent");
                    res.status(200);
                    res.send({ created: true })
                });
            }
        });
    }
    else if (role === 'student') {
        const { name, username, password, department, semester, image } = req.body;
        studentManage.getUserByUsername(username, (err, result) => {
            if (err || result) {
                // Hod already exists
                res.send({ userExists: true });
                res.end();
            }
            else {
                // Doesn't exists
                studentManage.createStudent(new Student({
                    name,
                    type: 'student',
                    username,
                    password,
                    department,
                    semester,
                    image
                }), (err) => {
                    if (err) {
                        console.log("Cannot create Student");
                        res.status(500);
                        res.send({ created: false });
                        return;
                    }
                    console.log("Created Student");
                    res.status(200);
                    res.send({ created: true })
                });
            }
        });
    }
})


module.exports = router;