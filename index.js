const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(db.url, {useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err);
    const database = client.db(db.dbName);
    require('./routes.js')(app, database);
    app.listen(8000, () => {
        console.log('connected to '+ db.url);
        console.log('We are live on http://localhost:8000');
    })



})

