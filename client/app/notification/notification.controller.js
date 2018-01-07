var app = angular.module('app')
        
app.controller('Notif.IndexController', Controller);

function Controller($scope, $rootScope, $interval, NotifService, FlashService, socket) {

    var vm = this;

    vm.notifs = null;

    var NotifInterval = $interval(function(){
        initController();
    }.bind(this), 1000);   

    initController();

    function initController() {

        NotifService.GetAll().then(function (notifs) {
            vm.all_notifs = notifs;
        });

    }

    NotifService.Update().then(function (resp) {
        console.log("All notifications have been read");
    });

    /*
    vm.addNotif = function(data){
        NotifService.Add(data){
            .then(function () {
                FlashService.Success('Notif Added');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }
    */

    vm.deleteNotif = function(_id) {
        NotifService.Delete(_id)
            .then(function () {
                FlashService.Success('Notif Deleted');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
    };
}

