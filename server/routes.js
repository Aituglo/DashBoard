module.exports = function(app) {

    // routes

    //base
    app.use('/login', require('../controllers/login.controller'));
    app.use('/register', require('../controllers/register.controller'));

    //angular
    app.use('/app', require('../controllers/app.controller'));

    //api
    app.use('/api/users', require('../controllers/api/users.controller'));
    app.use('/api/todo', require('../controllers/api/todo.controller'));

    // make '/app' default route
    app.get('/', function (req, res) {
        return res.redirect('/app');
    });

};