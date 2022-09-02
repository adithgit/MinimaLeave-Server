var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Parent = require('./parent');

var studentSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  department: String,
  semester:Number,
  image: String,
  leaves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave"
    }
  ],
  guardian:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Parent
  }
});

var Student = (module.exports = mongoose.model("Student", studentSchema));

module.exports.createStudent = function(newStudent, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newStudent.password, salt, function(err, hash) {
      newStudent.password = hash;
      newStudent.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  Student.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  Student.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, passwordFound) {
    if (err) throw err;
    callback(null, passwordFound);
  });
};

module.exports.getLeaves = function(studentId, callback){
  Student.findOne({_id: studentId}, (err, res)=>{
    if(err) throw err;
    console.log(res);
  })
}