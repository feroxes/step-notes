const ObjectId = require('mongodb').ObjectId;


module.exports = function (app, db) {


    app.get('/showNotes', async (req, res) => {

        let result = null;

        let arrNotes = [];

        try {
            result = await db.collection('notes').find({user_id: 3}).forEach(elem => {
                arrNotes.push(elem);
            });

            res.send(arrNotes);


        } catch (err) {console.log(err)};

    })


    app.get('/showNotes/:login', async (req, res) => {

        let result = null;

        let arrNotes = [];

        try {
            result = await db.collection('notes').find({user_id: req.params.login}).forEach(elem => {
                arrNotes.push(elem);
            });

            res.send(arrNotes);


        } catch (err) {console.log(err)};

    })


}