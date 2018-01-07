var express = require('express');
var router = express.Router();

// use session auth to secure the angular app files
router.use('/',  function (req, res, next) {
    if (req.path !== '/user/login' && !req.session.token) {
        return res.redirect('/user/login?returnUrl=' + encodeURIComponent(req.path));
    }

    next();
});


router.get('/', function (req, res) {
    res.render('home/index');
});


module.exports = router;