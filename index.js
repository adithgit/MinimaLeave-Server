const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const auth = require('./auth');
const apply = require("./apply");
const grant = require('./grant');
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
app.use('/',grant);

app.get('/', (req, res) => {
    res.send({ homePage: true })
})



app.listen(8080, () => {
    console.log('listening to port 8080');
})