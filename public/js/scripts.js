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

    fetch(urlAddUser, {method: 'post'}).then(() => {
        hideSignup();
        showSuccessSignup();
            // document.getElementById('allTasks').innerHTML = response.json();

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

    $('#modalCreateUser').modal("show");

}


function hideSignup () {

    $('#modalCreateUser').modal("hide");

}


function showSuccessSignup () {

    $('#modalSuccessSignUp').modal("show");

}


function hideSuccessSignup () {

    $('#modalSuccessSignUp').modal("hide");

}


function showCancelLogin () {

    $('#modalCancelLogin').modal("show");

}

function showModalCancelSignup() {

    $('#modalCancelSignUp').modal("show");
}

function hideModalCancelSignup() {

    $('#modalCancelSignUp').modal("hide");
}


function showModalLogin() {

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






function showNotes(login) {

    console.log("login - " + login);

    fetch('http://localhost:8000/showNotes/' + login).then(response => {
        response.text().then(function (text) {
            // document.getElementById('allTasks').innerHTML = response.json();
            document.getElementById('block_notes').innerHTML = text;
        })
    }).then(() => {
        addClick();
    })

}




function checkUser() {
    userName = document.getElementById('inputLogin').value;


    let fetchLogin = 'http://localhost:8000/checkUser/' + userName;

    fetch(fetchLogin).then(async response => {
        if (response.ok) {

            let arr = await response.json();

            return arr;
        }
    }).then(resolved => {



        data = resolved;

        document.getElementById('logged-id').innerHTML = userName;
        $('#block-login-not-logged').toggleClass('d-none');
        $('#block-login-logged').toggleClass('d-none');
        showNotes(userName);



    }, rejected => {


        showCancelLogin();
    })

}



function checkSignupUser() {

    let newUserName = document.getElementById('inputCreateLogin').value;

    let fetchLogin = 'http://localhost:8000/checkUser/' + newUserName;

    fetch(fetchLogin).then(async response => {
        if (response.ok) {

            let arr = await response.json();

            return arr;
        }
    }).then(resolved => {
        hideSignup();
        showModalCancelSignup();


    }, rejected => {
        funcAddUser();
        hideSignup();
    })

}


// $('#block_notes').find("#block_notes div .card").each(function (i) {
//     $('#block_notes div .card').click(function (e) {
//         console.log(e.target);
//     });
// });

function addClick () {
    // console.log('add');
    //
    // $('#block_notes').find("#block_notes div .card").each(function (i) {
    //     $(this).click(function (e) {
    //         console.log(e.target);
    //     });
    // });

    // $("#block_notes div .card").click(function (e) {
    //     console.log(e.target);
    // });
}






let btnModalLogin = document.getElementById('btn-modal-login');

btnModalLogin.addEventListener('click', showModalLogin);

let btnFormLogin = document.getElementById('btn-form-login');

btnFormLogin.addEventListener('click', processLogin);

let btnModalLoginClose = document.getElementById('btn-form-login-cancel');

btnModalLoginClose.addEventListener('click', hideModalLogin);




let btnModalSignup = document.getElementById('btn-signup-login');

btnModalSignup.addEventListener('click', showSignup);


let btnModalSignupLogin = document.getElementById('btn-form-signup');

btnModalSignupLogin.addEventListener('click', checkSignupUser);

let btnModalSignupClose = document.getElementById('btn-form-signup-close');

btnModalSignupClose.addEventListener('click', hideSignup);






let btnLogOut = document.getElementById('btn-log-out');

// btnLogOut.addEventListener('click', addList);







let btnAddNote = document.getElementById('btn-add-note');

btnAddNote.addEventListener('click', addNote);

let btnAddList = document.getElementById('btn-add-list');

btnAddList.addEventListener('click', addList);




