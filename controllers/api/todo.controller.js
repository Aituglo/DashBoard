var config = require('config.json');
var express = require('express');
var router = express.Router();
var todoService = require('services/todo.service');

// routes
router.post('/add', addTodo);
router.get('/get', getTodo);
router.put('/:_id', updateTodo);
router.delete('/:_id', deleteTodo);

module.exports = router;

function addTodo(req, res) {
    todoService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getTodo(req, res) {
    todoService.getById(req.user.sub)
        .then(function (todo) {
            if (todo) {
                res.send(todo);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateTodo(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    todoService.update(userId, todoId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteTodo(req, res) {
    var id = req.params._id;

    todoService.delete(id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}