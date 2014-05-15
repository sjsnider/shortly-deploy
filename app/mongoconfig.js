var mongoose = require('mongoose');
mongoose.connect('mongodb://sjsnider:minlyhr13@ds030827.mongolab.com:30827/MongoLab-lo');

var urlSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

var Urls = mongoose.model('Urls', urlSchema);
var Users = mongoose.model('Users', userSchema);


var nick =new Users({
  username: 'nick',
  password: 'check'
  });
nick.save(function (err) {
  if (err) {
    console.log('errored');
    return;
  }
  Users.find(function (err, ourusers) {
    if (err) return console.error(err);
    console.log(ourusers);
  });
  console.log('saved');
});

















/*

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('we\'re connected');


var Dog = mongoose.model('Dog', { name: String });

var puppy = new Dog({ name: 'Zildjian' });
puppy.save(function (err) {
  if (err) // ...
  console.log('woof');
});



});

*/
