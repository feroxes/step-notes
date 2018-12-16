const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {
    app.set('views', './views');
    app.set('view engine', 'pug');

    app.get('/lists/:id', async (req, res) => {
        let data = null;
        try {
            data = await db.collection('notes').findOne({_id: ObjectId(req.params.id)});
            res.render("showListDetails", {result: data});

        } catch (err) {
            console.log(err)
        };
    })
};