var app = angular.module('app')
        
app.controller('Home.IndexController', Controller);

function Controller($scope, $rootScope, UserService, socket) {

    var vm = this;

    vm.user = null;

    vm.notif = function(){
        UserService.GetCurrent().then(function (user) {
            socket.emit('push', {"user": user._id, "name": "test", "read": 0, "text": "test"});
        });
        
    };

    initController();

    function initController() {
        // get current user
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
        });
    }

    
}

