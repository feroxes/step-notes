
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (app, db) {

    app.post('/checkUserData', async (req, res) => {

        console.log('check login & pass');

        let query = {
            login: req.body.login,
            // password: req.body.password
        };
        let arrLog = [];
        let resultObj;
        try {
            resultObj = await db.collection('users').findOne(query);

            console.log('result...');
            console.log(resultObj);
            if (resultObj) {
                console.log('password from database...');
                console.log(resultObj.password);

                bcrypt.compare(req.body.password, resultObj.password, function (err, result) {
                    if (result == true) {
                        console.log('pass true');
                        res.send(resultObj);
                    } else {
                        console.log('pass wrong');
                        res.send('no');
                    }
                })
            }
            else {
                res.send('no');
            }


        }
        catch (err) {
            console.log(err)
        }
    })


}