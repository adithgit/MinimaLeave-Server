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
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin:'https://minimaleave.vercel.app'}));
db.connect();
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    // Need to set a secret keyword here
    secret: 'sessionsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
    })
}))

app.get('/', (req, res)=>{
    res.send("wassup bro");
})

app.use('/api', router);


app.listen(process.env.PORT || 8080, () => {
    console.log('listening to port 8080');
})