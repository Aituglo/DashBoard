(function () {
    'use strict';

    angular
        .module('onyx')
        .factory('NotifService', Service);

    function Service($http, $q, $rootScope) {
        
        var service = {};

        service.Add = Add;
        service.GetAll = GetAll;
        service.GetUnview = GetUnview;
        service.Update = Update;
        service.Delete = Delete;

        return service;


        function Add(data) {
            return $http.post('/api/notifs/add', data).then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/notifs/get_all').then(handleSuccess, handleError);
        }

        function GetUnview() {
            return $http.get('/api/notifs/get_unview').then(handleSuccess, handleError);
        }

        function Update() {
            return $http.get('/api/notifs/read_all').then(handleSuccess, handleError);
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