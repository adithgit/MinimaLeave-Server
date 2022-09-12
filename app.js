const express = require('express');
var session = require('express-session');
Student = require("./models/student"),
Parent = require("./models/parent"),
Hod = require("./models/hod"),
Leave = require("./models/leave");
const db = require('./database/db');
const router = require('./routes/router');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const app = express();
app.use(cors());
db.connect();
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    // Need to set a secret keyword here
    secret: 'sessionsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/leave',
    })
}))

app.use('/api', router);


app.listen(8080 || process.env.PORT, () => {
    console.log('listening to port 8080');
})