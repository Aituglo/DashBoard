(function () {
    'use strict';

    angular
        .module('app')
        .factory('TodoService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/todo/get').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/todo/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/todo/' + username).then(handleSuccess, handleError);
        }

        function Create(todo) {
            return $http.post('/api/todo/add', todo).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/todo/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/todo/' + _id).then(handleSuccess, handleError);
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
