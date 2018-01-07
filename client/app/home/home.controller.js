var app = angular.module('app')
        
app.controller('Home.IndexController', Controller);

function Controller($scope, $rootScope, UserService, socket) {

    var vm = this;

    vm.notif = function(){
        UserService.GetCurrent().then(function (user) {
            socket.emit('push', {"user": user._id, "name": "Welcome", "read": 0, "text": "I'm Onyx your dashboard", "fa": "fa-home"});
        });
        
    };


    
}

