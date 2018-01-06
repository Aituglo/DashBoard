var notifService = require('services/notif.service');

module.exports = function(io, domain){

  io.on('connection', function(socket){

    socket.on('user.connected', function(data){
        console.log("Connected : " + data.username);
    });

    socket.on('user.disconnected', function(data){
        console.log("Disconnected : " + data.username);
    });


    //push

    socket.on('push', function(data){
      notifService.push(data)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
    });

    //Erreur
    domain.on('error', function(err){
      socket.emit('server-error', err.message, err); 
    });
    process.on('uncaughtException', function(err){
      socket.emit('server-error', err.message, err); 
    });
  });

};