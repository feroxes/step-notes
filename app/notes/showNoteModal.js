module.exports = function (app, db) {
    app.set('views', './views');
    app.set('view engine', 'pug');

    app.get ('/showNoteModal', (req, res) => {
        res.render('note_form');
    })
};