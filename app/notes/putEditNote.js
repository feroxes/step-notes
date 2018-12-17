const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {


    app.put ('/notes/edit', (req, res) => {
        let note = req.body;
        console.log(note._id)
        let id = note._id.slice(6);
        let collection = db.collection('notes');
        collection.updateOne(
            {'_id' : ObjectId(id)},
            {$set: {'content' : note.content}},
            {upsert: true });
        res.send('ok');
    })
};