var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Parent = require('./parent');

var studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester:{
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  leaves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave"
    }
  ]
});

studentSchema.pre("save", async function(next){
  const student = this;
  const hash = await bcrypt.hash(student.password, 10);
  student.password = hash;
  next();
})

var Student = (module.exports = mongoose.model("Student", studentSchema));



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