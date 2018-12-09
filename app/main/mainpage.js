// const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

module.exports = function (app, db) {
    app.get('/', (req, res) => {
        let filePath = path.resolve(__dirname, "../../", "templates/index.html");

        res.setHeader('Content-Type', 'text/html');
        fs.readFile(filePath, (err, data) => {
            res.send(data);
        })
    })
}