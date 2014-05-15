var mongoose = require('./config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  createdat: { type: Date, default: Date.now }
});

var Users = mongoose.model('Users', userSchema);

Users.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      console.log('error comparing PWs: ', err);
      return;
    }
    callback(isMatch);
  });
};

Users.saveUser = function(user, callback) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(user.password, null, null)
  .then(function(hash) {
    var newUser = new Users({
      username: user.username,
      password: hash
    });
    newUser.save(function(err) {
      if (err) {
        console.log('error saving user: ', err);
        return;
      }
      console.log('user saved');
      callback(newUser);
    });
  });
};

module.exports = Users;
