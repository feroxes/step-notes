let userName = '';


function fieldAddUser() {
    fetch('http://localhost:8000/addUser').then(response => {
        response.text().then(function (text) {
            // document.getElementById('allTasks').innerHTML = response.json();
            document.getElementById('block_add_user').innerHTML = text;
        })
    })
}


function funcAddUser() {

console.log('add user func');

    let loginSignup = document.getElementById('inputCreateLogin').value;
    let passSignup = document.getElementById('inputCreatePass').value;

    let urlAddUser = 'http://localhost:8000/addUser/' + loginSignup + "-" + passSignup;

    console.log(urlAddUser);

    fetch(urlAddUser, {method: 'post'}).then(response => {
        response.text().then(function (text) {
            console.log(text);
            // document.getElementById('allTasks').innerHTML = response.json();
            document.getElementById('block_add_user').innerHTML = text;
        })
    })
}





function addNote() {
    fetch('http://localhost:8000/addNotes').then(response => {


    })
}

function addList() {
    fetch('http://localhost:8000/showListModal').then(response => {
               return response.text()
        }, networkError => console.log(networkError.message)
    ).then(test => {
        let list = document.getElementById('list');
        list.innerHTML = test;
    }).then(() => {
        $('#modalCreatesUser').modal("show")
    }).then ( () => {
        listGenerator();
    }).then(() => {
        postList();
    });
};

function listGenerator(){
    let listForm = document.getElementById('listForm');
    let inputCreateList = document.getElementById('inputCreateList');
    inputCreateList.addEventListener('keyup', createListItem);

    function createListItem(e){
        if(e.keyCode == 13){
            let div = document.createElement('div');
            div.className = 'row';
            let listItem = document.createElement('li');
            listItem.className = 'col-sm-11 itemList';
            listItem.innerHTML = inputCreateList.value;
            let trash = document.createElement('img');

            trash.src = 'img/trash.png';

            listForm.appendChild(div);
            div.appendChild(listItem);
            div.appendChild(trash);
            inputCreateList.value = '';

            trash.addEventListener('click', removeListItem);
            function removeListItem(e) {
                console.dir(e.target);
                e.target.previousSibling.remove();
                e.target.remove();
            }
        }

    }
};
function postList(){
    let addListBtn = document.getElementById('btn-form-addList');

    addListBtn.addEventListener('click', function(){
        let listArr = [];
        let title = document.getElementById('inputCreateTitle').value;
        let itemList = document.getElementsByClassName('itemList');
            for(let i = 0; i < itemList.length; i++){
                let obj = {
                    status: 'false',
                    text: itemList[i].innerHTML
                }
                listArr.push(obj);
            }
        console.log(listArr);

        fetch('http://localhost:8000/postlist', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body:JSON.stringify({
                type: 'lists',
                user_id: userName,
                content: {
                    title: title,
                    description: listArr
                }
            })
        }).then(() => {
            // console.log(res);

            $('#modalCreatesUser').modal('hide');
            document.getElementById('block_notes').innerText = '';
            showNotes(userName);
        })
    })
}



let data;
let arrNL = [];

function showSignup () {

    console.log('show cancel');
    $('#modalCreateUser').modal("show");

}


function showCancelLogin () {

    console.log('show cancel');
    $('#modalCancelLogin').modal("show");

}


// function getCancelLogin() {
//
//
//     fetch('http://localhost:8000/getCancelLoginForm').then(response => {
//         response.text().then(function (text) {
//             // document.getElementById('allTasks').innerHTML = response.json();
//             document.getElementById('blockModalCancelLogin').innerHTML = text;
//             // btnFormLogin.onclick(hideModal);
//         })
//     }).then(resolved => {
//         // showCancelLogin();
//         $('#modalCancelLogin').modal("show");
//     })
//
//
// }


function showModalLogin() {

    console.log('show modal window');
    $('#modalLoginUser').modal("show");


}

function hideModalLogin() {
    $('#modalLoginUser').modal("hide");

}

function processLogin() {

    console.log('hello');

    $('#modalLoginUser').modal("hide");

    checkUser();

}


// function getModalLogin() {
//
//     // userName = '';
//
//     console.log('get form from fetch');
//
//     fetch('http://localhost:8000/getLoginForm').then(response => {
//         response.text().then(function (text) {
//             // document.getElementById('allTasks').innerHTML = response.json();
//             document.getElementById('blockModalLogin').innerHTML = text;
//             // btnFormLogin.onclick(hideModal);
//         })
//     }).then(resolved => {
//
//         console.log('get form after fetch');
//         showModalLogin();
//
//     })
//
//
// }


// function getModalSignup() {
//
//     fetch('http://localhost:8000/getSignupForm').then(response => {
//         response.text().then(function (text) {
//             // document.getElementById('allTasks').innerHTML = response.json();
//             document.getElementById('blockModalCreateUser').innerHTML = text;
//             // btnFormLogin.onclick(hideModal);
//         })
//     }).then(() => {
//         showModal();
//
//     })
//
//
// }









// let btnFormLogin = document.getElementById('btn-form-login');


// btnFormLogin.addEventListener('click', hideModal);


function showNotes(login) {

    console.log("login - " + login);

    fetch('http://localhost:8000/showNotes/' + login).then(response => {
        if (response.ok) {
            console.log(response);

            let arr = response.json();

            console.log(arr);

            return arr;
        }
    }).then(resolved => {
        data = resolved;
        console.log(data);

        data.forEach(elem => {

            if (elem.type === 'notes') {

                let newNote = document.createElement('div');
                newNote.classList.add('block-note');
                let newNoteTitle = document.createElement('h3');
                newNoteTitle.classList.add('block-note-title');
                newNoteTitle.innerHTML = elem.content.title;
                let newNoteText = document.createElement('p');
                newNoteText.classList.add('block-note-text');
                newNoteText.innerHTML = elem.content.text;
                newNote.appendChild(newNoteTitle);
                newNote.appendChild(newNoteText);
                document.getElementById('block_notes').appendChild(newNote);

            }
            else if (elem.type === 'lists') {
                let newList = document.createElement('div');
                newList.classList.add('block-list');
                let newListTitle = document.createElement('h3');
                newListTitle.classList.add('block-list-title');
                newListTitle.innerHTML = elem.content.title;
                let newListItems = document.createElement('ul');
                newListItems.classList.add('block-list-items');

                let i = 0;
                let desc = elem.content.description;

                // console.log(desc);

                desc.forEach(item => {
                    let newListItem = document.createElement('li');
                    newListItem.classList.add('block-list-item');

                    let newListItemCheckbox = document.createElement('input');
                    newListItemCheckbox.setAttribute('type', 'checkbox');
                    newListItemCheckbox.setAttribute('name', 'item' + i);
                    if (item.status == true) {
                        let att = document.createAttribute("checked");
                        newListItemCheckbox.setAttributeNode(att);
                        // newListItemCheckbox.setAttribute('checked');
                    }

                    let newListItemLabel = document.createElement('label');
                    newListItemLabel.setAttribute('for', 'item' + i);
                    newListItemLabel.innerHTML = item.text;

                    newListItem.appendChild(newListItemCheckbox);
                    newListItem.appendChild(newListItemLabel);

                    newListItems.appendChild(newListItem);

                    i++;


                })

                // let newNoteText = document.createElement('p');
                // newNoteText.classList.add('block-note-text');
                // newNoteText.innerHTML = elem.content.text;


                newList.appendChild(newListTitle);
                newList.appendChild(newListItems);


                document.getElementById('block_notes').appendChild(newList);

            }


            // arrNL.push(elem);
        });

        console.log(arrNL);


    })

}


function checkUser() {

    // let inputLogin = document.getElementById('input-login').value;

    userName = document.getElementById('inputLogin').value;

    console.log("userName = " + userName);

    let fetchLogin = 'http://localhost:8000/checkUser/' + userName;

    console.log('fetchLogin = ' + fetchLogin);

    fetch(fetchLogin).then(async response => {
        if (response.ok) {
            console.log(response);

            let arr = await response.json();

            console.log(arr);

            return arr;
        }
    }).then(resolved => {
        data = resolved;

        console.log('login exists');
        showNotes(userName);


    }, rejected => {
        console.log('hahaha');

        showCancelLogin();

        // getCancelLogin();
    })


}



let btnModalLogin = document.getElementById('btn-modal-login');

// btnModalLogin.addEventListener('click', getModalLogin);

btnModalLogin.addEventListener('click', showModalLogin);


let btnModalLoginClose = document.getElementById('btn-form-login-out');

btnModalLoginClose.addEventListener('click', hideModalLogin);



let btnModalSignup = document.getElementById('btn-signup-login');

btnModalSignup.addEventListener('click', showSignup);



let btnModalSignupLogin = document.getElementById('btn-form-signup');

btnModalSignupLogin.addEventListener('click', funcAddUser);




let btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener('click', checkUser);

let btnAddNote = document.getElementById('btn-add-note');

btnAddNote.addEventListener('click', addNote);

let btnAddList = document.getElementById('btn-add-list');

btnAddList.addEventListener('click', addList);

