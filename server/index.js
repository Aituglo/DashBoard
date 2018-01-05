require('rootpath')();

var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('../config/config.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../client/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

app.use('/static', express.static('./client/static/'));

require('./routes.js')(app);

// start server
var server = app.listen(config.port, function () {
    console.log('Server listening at http://localhost:' + server.address().port);
});