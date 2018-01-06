var app = angular.module('app')
        
app.controller('Notif.IndexController', Controller);

function Controller($scope, $rootScope, NotifService, FlashService, socket) {

    var vm = this;

    vm.notifs = null;

    initController();

    function initController() {

        NotifService.GetAll().then(function (notifs) {
            vm.all_notifs = notifs;
        });

    }

    vm.deleteNotif = function(_id) {
        NotifService.Delete(_id)
            .then(function () {
                initController();
                NotifService.GetUnview().then(function (notifs) {
                    $rootScope.unview_notifs = notifs;
                }); 
                FlashService.Success('Notif Deleted');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
    };
}

