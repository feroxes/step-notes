const showNoteModal = require('./app/notes/showNoteModal');
const postNote = require ('./app/notes/postNote');
const showNoteDetails = require('./app/notes/showNoteDetails');
const putEditNote = require('./app/notes/putEditNote');
const deleteNote = require('./app/notes/deleteNote');

const showListModal = require('./app/lists/showListModal');
const postList = require ('./app/lists/postList');
const showListDetails = require('./app/lists/showListDetails');
const putEditList = require('./app/lists/putEditList');
const deleteList = require('./app/lists/deleteList');

const checkUser = require('./app/users/checkUser');
const checkUserData = require('./app/users/checkUserData');
const addNewUser = require('./app/users/addUser');



const openIndex = require('./app/main/mainpage');
const showNotes = require('./app/main/showNotes');

// const getLoginForm = require('./app/main/getLoginForm');




module.exports = function (app, db) {
    openIndex(app, db);

    showNoteModal(app, db);
    postNote(app, db);
    showNoteDetails(app, db);
    putEditNote(app, db);
    deleteNote(app, db);

    showListModal(app, db);
    postList(app, db);
    showListDetails(app, db);
    putEditList(app, db);
    deleteList(app, db);

    checkUser(app, db);
    checkUserData(app, db);
    addNewUser(app, db);

    showNotes(app, db);
    // getLoginForm(app);

};