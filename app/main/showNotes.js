const ObjectId = require('mongodb').ObjectId;


module.exports = function (app, db) {

    app.set('views', './views');
    app.set('view engine', 'pug');


    // app.get('/showNotes/:login', async (req, res) => {
    //
    //     let result = null;
    //
    //     console.log("req.params.login = " + req.params.login);
    //
    //     let arrNotes = [];
    //
    //     try {
    //         result = await db.collection('notes').find({user_id: req.params.login}).forEach(elem => {
    //             arrNotes.push(elem);
    //         });
    //
    //         res.send(arrNotes);
    //
    //
    //     } catch (err) {console.log(err)};
    //
    // })

    app.get('/showNotes/:login', async (req, res) => {

        let result = null;

        console.log("req.params.login = " + req.params.login);

        let arrNotes = [];

        try {
            result = await db.collection('notes').find({user_id: req.params.login}).forEach(elem => {
                arrNotes.push(elem);
            });

            res.render("mainlist_notes", {arr: arrNotes});


        } catch (err) {console.log(err)};

    })


}