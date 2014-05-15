var mongoose = require('mongoose');
var url = process.env.MONCONNECT || "mongodb://localhost/test";
mongoose.connect(url);
;
module.exports = mongoose;
