const express = require('express');
const app = express();
const bodyParser = require('body-parser');
Student = require("./models/student"),
Warden = require("./models/parent"),
Hod = require("./models/hod"),
Leave = require("./models/leave");


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.send({ loginPage: 'true' });
    res.end();
})

app.post('/signup', (req, res) => {
    const {role} = req.body;
    if (role === 'admin') {
    }
    else if (role === 'parent') {

    }
    else if (role === 'student') {
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