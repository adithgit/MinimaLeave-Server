var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var hodSchema = new mongoose.Schema({
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
  department: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

hodSchema.pre("save", async function (next){
  const hod = this;
  const hash = await bcrypt.hash(hod.password, 10);
  hod.password = hash;
  next();
})


var Hod = (module.exports = mongoose.model("Hod", hodSchema));


module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  Hod.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  Hod.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, passwordFound) {
    if (err) return callback(err, null);
    callback(null, passwordFound);
  });
};
