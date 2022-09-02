const express = require('express');
const app = express();
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

app.get('/', (req, res) => {
    res.send({ homePage: true });
})



app.listen(8080 || process.env.PORT, () => {
    console.log('listening to port 8080');
})