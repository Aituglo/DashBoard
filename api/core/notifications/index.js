var config = require('config/config.js');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.database.url, { native_parser: true });
var socket = require('socket.io-client')(config.socketUrl);

var Notif = require('api/models/Notif.js');

var service = {};

service.getAll = getAll;
service.getUnview = getUnview;
service.push = push;
service.deleteNotif = deleteNotif;
service.readAll = readAll;

module.exports = service;

function getAll(user) {
    var deferred = Q.defer();

    Notif.find({ user: user }, function (err, notifs) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (notifs) {
            // return notifs
            deferred.resolve(notifs);
        } else {
            // no notifs
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getUnview(user) {
    var deferred = Q.defer();

    Notif.find({ user: user, read: 0}, function (err, notifs) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (notifs) {
            // return notifs
            deferred.resolve(notifs);
        } else {
            // no notifs
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function readAll(user) {
    var deferred = Q.defer();


    Notif.find({ user: user, read: 0}, function (err, notifs) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (notifs) {

            for(var x in notifs){
                Notif.update(
                    { _id: notifs[x]._id },
                    { $set: {read: 1} },
                    function (err, doc) {
                        if (err) deferred.reject(err.name + ': ' + err.message);
        
                        deferred.resolve({"statut": "success"});
                    });
            }
            deferred.resolve();
        } else {
            // no notifs
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function push(data){
    var deferred = Q.defer();
   
    var query = new Notif(data);

    query.save(function (err, notifs) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        
        socket.emit('pushed');
        deferred.resolve();
    });

    return deferred.promise;
}

function deleteNotif(_id){
    var deferred = Q.defer();
    
    Notif.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);
    
            deferred.resolve();
    });
    
    return deferred.promise;
}
