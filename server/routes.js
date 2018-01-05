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

    app.get('/hello', function(req, res){
        var returnUrl = req.query.returnUrl;
        // log user out
        delete req.session.token;

        // move success message into local variable so it only appears once (single read)
        var viewData = { success: req.session.success };
        delete req.session.success;

        return res.render('account/hello', {next: '/login?returnUrl=' + returnUrl});
    });

};