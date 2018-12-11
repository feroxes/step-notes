const addNewNote = require('./app/notes/addNotes');
const addNewList = require('./app/lists/addLists');


const checkUser = require('./app/users/checkUser');
const addNewUser = require('./app/users/addUser');



const openIndex = require('./app/main/mainpage');
const showNotes = require('./app/main/showNotes');

// const getLoginForm = require('./app/main/getLoginForm');




module.exports = function (app, db) {
    openIndex(app, db);
    addNewNote(app, db);
    addNewList(app, db);

    checkUser(app, db);
    addNewUser(app, db);

    showNotes(app, db);
    // getLoginForm(app);

}