
module.exports = function (app) {

    app.set('views', './views');
    app.set('view engine', 'pug');

    app.get('/getLoginForm', (req, res) => {
        res.render('login_form');
    });

    app.get('/getCancelLoginForm', (req, res) => {
        res.render('cancel_login');
    });

}