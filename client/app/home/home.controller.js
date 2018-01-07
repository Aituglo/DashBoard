var app = angular.module('onyx')
        
app.controller('homeCtrl', HomeCtrl);

function HomeCtrl(UserService, socket) {

    var vm = this;

    vm.user = null;

    UserService.GetCurrent().then(function (user) {
        vm.user = user;
    });

    /*
    vm.addNotif = function(){
        UserService.GetCurrent().then(function (user) {
            socket.emit('push', {"user": user._id, "name": "Welcome", "read": 0, "text": "I'm Onyx your dashboard", "fa": "fa-home"});
        });
        
    };
    */
    
}

