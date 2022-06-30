const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/leave').then(()=>{
    console.log('db connected');
})

const studentSchema = new mongoose.Schema({
    name: String,
    semester: Number,
    department: String,
    admno: Number
})

const parentSchema = new mongoose.Schema({
    name: String,
    admnoChild: Number,
    mobile: Number
})


const adminSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    department: String
})

