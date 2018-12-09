


const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {

    app.get('/checkUser/:login', async (req, res) => {
        let query = {
            login: req.params.login
            // login: 'test1'
        };

        let arrLog = [];

        console.log('check user ' + query.login);

        console.log(query);

        let result;

        try {
            // result = await db.collection('users').find(query).forEach(elem => {
            //     arrLog.push(elem);
            // });

            result = await db.collection('users').findOne(query);
            console.log(result);

            res.send(result);

        }
        catch (err) {console.log(err)}



    })
}