const addNewNote = require('./app/notes/addNotes');
const showListModal = require('./app/lists/showListModal');
const postList = require ('./app/lists/postList');
const showListDetails = require('./app/lists/showListDetails');
const putEditList = require('./app/lists/putEditList')

const checkUser = require('./app/users/checkUser');
const checkUserData = require('./app/users/checkUserData');
const addNewUser = require('./app/users/addUser');



const openIndex = require('./app/main/mainpage');
const showNotes = require('./app/main/showNotes');

// const getLoginForm = require('./app/main/getLoginForm');




module.exports = function (app, db) {
    openIndex(app, db);
    addNewNote(app, db);
    showListModal(app, db);
    postList(app, db);
    showListDetails(app, db);
    putEditList(app, db);

    checkUser(app, db);
    checkUserData(app, db);
    addNewUser(app, db);

    showNotes(app, db);
    // getLoginForm(app);

}