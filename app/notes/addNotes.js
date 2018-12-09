module.exports = function (app, db) {

    app.get('/addNotes', (req, res) => {

        let someDate = new Date();


        let note = {
            type: "notes",
            user_id: 3,
            content: {
                title: "forth note",
                text: "Комуняку на гілляку"
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