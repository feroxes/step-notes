const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {


    app.delete ('/lists/delete', (req, res) => {
        let id = req.body._id.slice(6);

        let collection = db.collection('notes');

        collection.deleteOne({'_id' : ObjectId(id)});
        res.send('ok');
    })
};