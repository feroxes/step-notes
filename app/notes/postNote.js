module.exports = function (app, db) {
    app.post ('/postNote', (req, res) => {
        console.log(req.body.content);
        let note = req.body;

        let collection = db.collection('notes');
        collection.insertOne(note, (err, result) => {
            if (err) console.log(err);
        });

        res.send('ok');
    })
};