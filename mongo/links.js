var mongoose = require('./config');
var crypto = require('crypto');

var urlSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 },
  createdat: { type: Date, default: Date.now }
});

var Links = mongoose.model('Links', urlSchema);

Links.saveLink = function(link, callback) {
  var shasum = crypto.createHash('sha1');
  shasum.update(link.url);
  link.code = shasum.digest('hex').slice(0, 5);

  var newLink = new Links(link);
  newLink.save(function(err) {
    if (err) {
      console.log('error saving link: ', err);
      return;
    }
    console.log('link saved');
    callback(newLink);
  });
};

module.exports = Links;
