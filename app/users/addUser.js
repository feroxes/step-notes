const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

module.exports = function (app, db) {

    app.use(bodyParser.urlencoded({extended: false}));


    // app.get('/addUser', (req, res) => {
    //
    //     let filePath = path.resolve(__dirname, "../../", "templates/formAddUser.html");
    //
    //     res.setHeader('Content-Type', 'text/html');
    //     fs.readFile(filePath, (err, data) => {
    //         res.send(data);
    //     })
    //
    //
    // });


    // app.get('/api/addUser', (req, res) => {
    //
    //     res.send(`New user ${req.body.login} was created successfully`);
    //
    //
    // })


    app.post('/addUser/:login-:password', (req, res) => {


        console.log(req.params);

        console.log('Login = ' + req.params.login + ', Password = ' + req.params.password);

        let post = {
            login: req.params.login,
            password: req.params.password,
        };

        let collection = db.collection('users');
        collection.insertOne(post, (err, result) => {
            if (err) console.log(err);
        });
        // res.send('ok');
        // res.redirect('/');

    })


}
