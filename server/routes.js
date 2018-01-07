module.exports = function(app) {

    // routes

    //base
    app.use('/login', require('../api/controllers/LoginController'));
    app.use('/logout', require('../api/controllers/LogoutController'));
    app.use('/register', require('../api/controllers/RegisterController'));

    //angular
    app.use('/app', require('../api/controllers/AppController'));

    //api
    app.use('/api/users', require('../api/controllers/UsersController'));
    app.use('/api/notifs', require('../api/controllers/NotificationController'));
    app.use('/api/todo', require('../api/controllers/TodoController'));
    
    // make '/app' default route
    app.get('/', function (req, res) {
        return res.redirect('/app');
    });

};