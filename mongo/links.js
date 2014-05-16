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

urlSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = Links;
