const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (app, db) {

    app.use(bodyParser.urlencoded({extended: false}));

    app.post('/addUser', (req, res) => {

        let newPass = '';
        console.log(req.params);

        bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
            console.log('Login = ' + req.body.login + ', Password = ' + hash);
            let post = {
                login: req.body.login,
                password: hash,
            };

            let collection = db.collection('users');
            collection.insertOne(post, (err, result) => {
                if (err) console.log(err);
            });
        });

        res.send('Your user was successfully added');

    })


}
