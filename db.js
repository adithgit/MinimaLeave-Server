const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/leave').then(()=>{
    console.log('db connected');
})

const studentSchema = new mongoose.Schema({
    name: String,
    semester: Number,
    department: String,
    admno: Number,
    mobile: Number
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

const studentModel = mongoose.model('studentModel', studentSchema);
const adminModel = mongoose.model('adminModel', adminSchema);
const parentModel = mongoose.model('parentModel', parentSchema);

const createStudent = (name, semester, department, admno, mobile)=>{
    const student = new studentModel({
        name,
        semester,
        department,
        admno,
        mobile
    })
    student.save((err)=>{
        if(err){ 
            console.log(err);
            return;
        }
        console.log("Saved student");
    })
}

const createAdmin = (name, mobile, department)=>{
    const admin = new adminModel({
        name,
        mobile,
        department
    });
    admin.save((err)=>{
        if(err){
            console.log(err);
            return
        }
        console.log("saved admin");
    })
}

const createParent = (name , admnoChild, mobile)=>{
    const parent = new parentModel({
        name,
        admnoChild,
        mobile
    });
    parent.save((err=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("parent saved");
    }))
}

const getParent = ( mobile )=>{
}

const getAdmin = ()=>{

}

const getStudent = ()=>{

}

module.exports ={
    createStudent,
    createAdmin,
    createParent
}