var mongoose = require('./config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  createdat: { type: Date, default: Date.now }
});

var Users = mongoose.model('Users', userSchema);

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null)
  .then(function(hash) {
    this.password = hash;
    next();
  });
});

Users.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      console.log('error comparing PWs: ', err);
      return;
    }
    callback(isMatch);
  });
};

module.exports = Users;
