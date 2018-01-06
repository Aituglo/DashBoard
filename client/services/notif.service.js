(function () {
    'use strict';

    angular
        .module('app')
        .factory('NotifService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.GetUnview = GetUnview;
        service.Delete = Delete;

        return service;


        function GetAll() {
            return $http.get('/api/notifs/get_all').then(handleSuccess, handleError);
        }

        function GetUnview() {
            return $http.get('/api/notifs/get_unview').then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/notifs/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();