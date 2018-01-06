var config = require('config/config.js');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
var notifService = require('services/notif.service');
var socket = require('socket.io-client')(config.socketUrl);

// routes
router.get('/get_all', getAll);
router.get('/get_unview', getUnview);
router.delete('/:_id', deleteNotif);

module.exports = router;

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