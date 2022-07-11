var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var parentSchema = new mongoose.Schema({
  name: String,
  type: String,
  username: String,
  password: String,
  image: String
});


var Parent = (module.exports = mongoose.model("Parent", parentSchema));

module.exports.createParent = function(newParent, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newParent.password, salt, function(err, hash) {
      newParent.password = hash;
      newParent.save(callback);
    });
  });
};

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
