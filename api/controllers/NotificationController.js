var config = require('config/config.js');
var express = require('express');
var router = express.Router();
var userService = require('api/core/users/index');
var notifService = require('api/core/notifications/index');
var socket = require('socket.io-client')(config.socketUrl);

// routes
router.post('/add', Add);
router.get('/get_all', getAll);
router.get('/get_unview', getUnview);
router.get('/read_all', readAll);
router.delete('/:_id', deleteNotif);

module.exports = router;

function Add(req, res) {
    notifService.push(req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });res.sendStatus(404);
}

function getAll(req, res) {
    notifService.getAll(req.user.sub)
        .then(function (notifs) {
            if (notifs) {
                res.send(notifs);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getUnview(req, res) {
    notifService.getUnview(req.user.sub)
        .then(function (notifs) {
            if (notifs) {
                res.send(notifs);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function readAll(req, res) {
    notifService.readAll(req.user.sub)
        .then(function (resp) {
            if (resp) {
                res.send(resp);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteNotif(req, res) {

    var notifId = req.url.replace("/","");

    notifService.deleteNotif(notifId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}