(function () {
    'use strict';

    angular
        .module('app')
        .controller('Todo.IndexController', Controller);

    function Controller($rootScope, $window, TodoService, FlashService, UserService) {
        var vm = this;

        vm.todos = null;
        vm.user = null
        vm.addTodo = addTodo;
        vm.deleteTodo = deleteTodo;

        loadTodo();

        function loadTodo() {
            // get current user
            TodoService.GetAll().then(function (todos) {
                vm.todos = todos;
            });
        }

        function addTodo() {
            UserService.GetCurrent().then(function (user) {
                vm.todo.userId = user._id;
                TodoService.Create(vm.todo)
                .then(function () {
                    vm.todo.name = "";
                    loadTodo();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
                
            });
            
        }

        function deleteTodo(_id) {
            TodoService.Delete(_id)
                .then(function () {
                    loadTodo();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();