var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config/config.js');
var socket = require('socket.io-client')(config.socketUrl);

router.get('/login', function (req, res) {
    res.render('account/login');
});


router.post('/login', function (req, res) {
    // authenticate using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/authenticate',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('account/login', { error: 'An error occurred' });
        }

        if (!body.token) {
            return res.render('account/login', { error: body, username: req.body.username });
        }

        // save JWT token in the session to make it available to the angular app
        req.session.token = body.token;
        req.session.username = req.body.username;

        res.cookie('lang', body.user.lang);
        
        // redirect to returnUrl
        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        res.redirect(returnUrl);
    });
});

router.get('/logout', function (req, res) {

    socket.emit('user.disconnected', {"username": req.session.username});

    // log user out
    delete req.session.token;
    delete req.session.username;

    res.cookie('lang', config.default_lang);

    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success };
    delete req.session.success;

    res.redirect('/user/login' && decodeURIComponent('/user/login') || '/');
});

router.get('/register', function (req, res) {
    res.render('account/register');
});

router.post('/register', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('account/register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('account/register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/user/login');
    });
});

router.get('/manage', function (req, res) {
    res.render('account/manage');
});

module.exports = router;
