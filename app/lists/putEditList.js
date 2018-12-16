const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {


    app.put ('/lists/edit', (req, res) => {
        let list = req.body;
        let id = list._id.slice(6);
        let collection = db.collection('notes');
        collection.updateOne(
            {'_id' : ObjectId(id)},
            {$set: {'content.description' : list.content}},
            {upsert: true });
        res.send('ok');
    })
};