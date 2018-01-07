// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    firstName    : String,
    lastName    : String,
    username     : String,
    email        : String,
    password     : String,
    admin: Boolean,
});



// create the model for users and expose it to our app
 var User = mongoose.model('User', userSchema);
 User.prototype.isAdmin = function() {
   return this.admin;
 };
module.exports = User;