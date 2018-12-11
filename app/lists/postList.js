module.exports = function (app, db) {
    app.post ('/postlist', (req, res) => {
        console.log(req.body.content.description);
        let list = req.body;

        let collection = db.collection('notes');
         collection.insertOne(list, (err, result) => {
             if (err) console.log(err);
         })

        res.send('ok');
    })
}