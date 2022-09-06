var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var adminSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true
  },
});

adminSchema.pre("save", async function (next){
  const admin = this;
  const hash = await bcrypt.hash(admin.password, 10);
  admin.password = hash;
  next();
})


var Admin = (module.exports = mongoose.model("admin", adminSchema));


module.exports.getUserByUsername = function (username, callback) {
  var query = { username: username };
  Admin.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
  Admin.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, passwordFound) {
    if (err) return callback(err, null);
    callback(null, passwordFound);
  });
};
