const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hodManage = require('./models/hod');
const parentManage = require('./models/parent');
const studentManage = require('./models/student');
Student = require("./models/student"),
    Parent = require("./models/parent"),
    Hod = require("./models/hod"),
    Leave = require("./models/leave");


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send({ homePgae: true })
})

app.post('/login', (req, res) => {
    const { role } = req.body;
    if (role === "hod") {
        console.log("HOD request");
        // Authenticate HOD
    }
    else if (role === "parent") {
        console.log("Parent request");
        // Authenticate Parent
    }
    else if (role === "student") {
        console.log("Student request");
        // Authenticate student
    }
    else {
        res.status(404);
        res.end();
    }
})

app.post('/signup', (req, res) => {
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

app.post('/login', (req, res) => {
    if (user === 'admin') {
        // check if admin exists 
    }
    else if (user === 'student') {
        // Check if student exists 
    }
    else if (user === 'parent') {
        // check if parent exists
    }
})

app.get('/apply', (req, res) => {
    // check if student is logged in
    // logic for granting leave
})

app.get('/grant', (req, res) => {
    if (user === 'admin') {
        // check if logged in
        // check if parent granted permission 
        // grant or decline permission
    }
    if (user === 'parent') {
        // check if logged in 
        // grant permission -> have to wait for admin to authorize
    }
})

app.listen(8080, () => {
    console.log('listening to port 8080');
})