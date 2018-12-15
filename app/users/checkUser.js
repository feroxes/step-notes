const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {

    app.get('/checkUser/:login', async (req, res) => {

        console.log('check login');

        let query = {
            login: req.params.login
        };
        let arrLog = [];
        let result;
        try {

            result = await db.collection('users').findOne(query);
            res.send(result);
        }
        catch (err) {
            console.log(err)
        }
    });





}