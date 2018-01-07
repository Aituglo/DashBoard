var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config/config.js');
var socket = require('socket.io-client')(config.socketUrl);

router.get('/', function (req, res) {

    socket.emit('user.disconnected', {"username": req.session.username});

    // log user out
    delete req.session.token;
    delete req.session.username;

    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success };
    delete req.session.success;

    res.redirect('/login' && decodeURIComponent('/login') || '/');
});

module.exports = router;