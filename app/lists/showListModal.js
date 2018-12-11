module.exports = function (app, db) {
    app.set('views', './views');
    app.set('view engine', 'pug');

 app.get ('/showListModal', (req, res) => {
     res.render('list_form');
     // let someDate = new Date();
     //
     //
     // let list = {
     //     type: "lists",
     //     user_id: "Dmytro",
     //     content: {
     //         title: "My wish list",
     //         description: [
     //             {
     //                 status: false,
     //                 text: "Ferrari F40",
     //                 id_desc: 1,
     //             },
     //             {
     //                 status: false,
     //                 text: "Ferrari F1",
     //                 id_desc: 2,
     //             },
     //             {
     //                 status: false,
     //                 text: "Ferrari 458",
     //                 id_desc: 3,
     //             },
     //
     //         ]
     //     },
     //     date_creation: someDate,
     // }
     //
     //
     // let collection = db.collection('notes');
     // collection.insertOne(list, (err, result) => {
     //     if (err) console.log(err);
     // })
 })
}