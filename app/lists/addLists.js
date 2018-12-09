module.exports = function (app, db) {
 app.get ('/addLists', (req, res) => {
     let someDate = new Date();


     let list = {
         type: "lists",
         user_id: 3,
         content: {
             title: "new list",
             decsription: [
                 {
                     status: true,
                     text: "hernya",
                     id_desc: 1,
                 },
                 {
                     status: false,
                     text: "hren",
                     id_desc: 2,
                 },
                 {
                     status: false,
                     text: "huinya",
                     id_desc: 3,
                 }
             ]
         },
         date_creation: someDate,
     }


     let collection = db.collection('notes');
     collection.insertOne(list, (err, result) => {
         if (err) console.log(err);
     })

     res.send('Your list was successfully addes');

 })


}