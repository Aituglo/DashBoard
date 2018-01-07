// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var notifSchema = mongoose.Schema({
    user: String,
    name: String,
    text: String,
    time: { type: Date, default: Date.now },
    fa: String,
    read: Boolean
});



// create the model for users and expose it to our app
 var Notif = mongoose.model('Notif', notifSchema);
 Notif.prototype.isRead = function() {
   return this.read;
 };
module.exports = Notif;