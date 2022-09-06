var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  students:{
    type: Array,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  student:{
    type: Array,
    default: []
  }
});

parentSchema.pre("save", async function (next){
  const parent = this;
  const hash = await bcrypt.hash(parent.password, 10);
  parent.password = hash;
  next();
});

var Parent = (module.exports = mongoose.model("Parent", parentSchema));

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  Parent.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  Parent.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, passwordFound) {
    if (err) throw err;
    callback(null, passwordFound);
  });
};
