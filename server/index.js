require('rootpath')();

var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('../config/config.js');
var passport = require('passport');
var domain = require('domain');
var server = require('http').Server(app);
var i18n = require("i18n");

var io = require('socket.io')(server);
var cookieParser = require('cookie-parser');

var passportSocketIo = require("passport.socketio");

var MongoStore = require('connect-mongo')(session);

var databaseURL = config.database.url;
var mongoOptions = {useMongoClient: true}; 

if(config.database.user != null && config.database.pass != null){
  mongoOptions.user = config.database.user;
  mongoOptions.pass = config.database.pass;
}

i18n.configure({
    locales:['en', 'fr'],
    directory: __dirname + '/../config/locales',
    defaultLocale: 'fr'
});

mongoose.connect(databaseURL, mongoOptions); // connect database

var mongoStore = new MongoStore({mongooseConnection: mongoose.connection});

require('../config/passport.js')(passport); // pass passport for configuration

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../client/views');

//app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true, store: mongoStore  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(i18n.init);

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

app.use('/static', express.static('./client/'));

require('./routes.js')(app, passport);

// start server
server.listen(config.port, function () {
    console.log('Server listening at http://localhost:' + server.address().port);
});

// Sockets.io

io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    secret: config.secret,
    key: 'connect.sid',
    store: mongoStore,
    success: function(data, accept){ 
        accept(null, true);
    },
    fail: function(data, message, error, accept){ 
        //console.log('fail', message, error);  TODO: Fix Passport
        accept(null, false);
    }
}));

  
var d = domain.create();
d.run(function(){
    require('./sockets.js')(io, d); 
});
