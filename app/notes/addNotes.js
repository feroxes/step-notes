module.exports = function (app, db) {

    app.get('/addNotes', (req, res) => {

        let someDate = new Date();


        let note = {
            type: "notes",
            user_id: "user1",
            content: {
                title: "What to Do",
                text: "Please do something"
            },
            date_creation: someDate,

        }


        let collection = db.collection('notes');
        collection.insertOne(note, (err, result) => {
            if (err) console.log(err);

        })
        res.send('Your note is added');

    })

}