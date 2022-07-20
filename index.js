const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const auth = require('./auth');
const apply = require("./apply")
var session = require('express-session');
Student = require("./models/student"),
    Parent = require("./models/parent"),
    Hod = require("./models/hod"),
    Leave = require("./models/leave");


app.use(session({
    // Need to set a secret keyword here
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', auth);
app.use('/', apply);

app.get('/', (req, res) => {
    res.send({ homePage: true })
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