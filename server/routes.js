module.exports = function(app, passport, i18n) {

    // routes

    //base
    app.use('/user', require('../api/controllers/UsersController'));
    app.use('/home', require('../api/controllers/HomeController'));
    app.use('/settings', require('../api/controllers/SettingsController'));
    app.use('/notifications', require('../api/controllers/NotificationsController'));
    app.use('/todo', require('../api/controllers/TodoController'));


    //api
    app.use('/api/users', require('../api/controllers/UsersController.api'));
    app.use('/api/notifs', require('../api/controllers/NotificationsController.api'));
    app.use('/api/todo', require('../api/controllers/TodoController.api'));
    
    app.get('/', function (req, res) {
        return res.redirect('/home');
    });

    app.use(function(req, res, next){
        // 404
        res.status(404).render('404');
    });

    app.use(function(req, res, next){
        // 505
        res.status(500).render('500');
    });


    app.use(function (err, req, res, next) {
        // If no auth
        if (err.name === 'UnauthorizedError') {
          res.status(401).redirect('/');
        }
    });

};