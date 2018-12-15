let userName = '';

if (localStorage["yourUser"]) {
    userName = localStorage["yourUser"];
    document.getElementById('logged-id').innerHTML = userName;
    $('#block-login-not-logged').toggleClass('d-none');
    $('#block-login-logged').toggleClass('d-none');

    showNotes(userName);
}


function fieldAddUser() {
    fetch('http://localhost:8000/addUser').then(response => {
        response.text().then(function (text) {
            // document.getElementById('allTasks').innerHTML = response.json();
            document.getElementById('block_add_user').innerHTML = text;
        })
    })
}

function funcLogout() {
    userName = '';


    $('#block-login-not-logged').toggleClass('d-none');
    $('#block-login-logged').toggleClass('d-none');
    $('#block_notes').text('');

    $('#inputLogin').attr("value", "");
    $('#inputPass').attr("value", "");
    localStorage["yourUser"] = '';

}


function funcAddUser() {

    console.log('add user func');

    let loginSignup = document.getElementById('inputCreateLogin').value;
    let passSignup = document.getElementById('inputCreatePass').value;

    let urlAddUser = 'http://localhost:8000/addUser';

    console.log(urlAddUser);

    fetch(urlAddUser, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            login: loginSignup,
            password: passSignup
        })
    }).then(() => {
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
    }).then(() => {
        listGenerator();
    }).then(() => {
        postList();
    });
};

function listGenerator() {
    let listForm = document.getElementById('listForm');
    let inputCreateList = document.getElementById('inputCreateList');
    inputCreateList.addEventListener('keyup', createListItem);

    function createListItem(e) {
        if (e.keyCode == 13) {
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

function postList() {
    let addListBtn = document.getElementById('btn-form-addList');

    addListBtn.addEventListener('click', function () {
        let listArr = [];
        let title = document.getElementById('inputCreateTitle').value;
        let itemList = document.getElementsByClassName('itemList');
        for (let i = 0; i < itemList.length; i++) {
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
            body: JSON.stringify({
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

function showSignup() {

    console.log('show cancel');
    $('#modalCreateUser').modal("show");

}


function hideSignup() {

    $('#modalCreateUser').modal("hide");

}


function showSuccessSignup() {

    $('#modalSuccessSignUp').modal("show");

}


function hideSuccessSignup() {

    $('#modalSuccessSignUp').modal("hide");

}


function showCancelLogin() {

    console.log('show cancel');
    $('#modalCancelLogin').modal("show");

}

function showModalCancelSignup() {

    $('#modalCancelSignUp').modal("show");
}

function hideModalCancelSignup() {

    $('#modalCancelSignUp').modal("hide");
}


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






function showNotes(login) {

    console.log("login - " + login);

    fetch('http://localhost:8000/showNotes/' + login).then(response => {
        return response.text()}).then(function (text) {
            // document.getElementById('allTasks').innerHTML = response.json();
            document.getElementById('block_notes').innerHTML = text;
        }).then(resolved => {
            console.log('hi add click');

    })

}


function checkUser() {

    // let inputLogin = document.getElementById('input-login').value;

    userName = document.getElementById('inputLogin').value;

    let userPassword = document.getElementById('inputPass').value;

    let fetchLogin = 'http://localhost:8000/checkUserData/';

    console.log('hello check log & pass + ' + fetchLogin + " " + userName + " " + userPassword);


    fetch('http://localhost:8000/checkUserData', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            login: userName,
            password: userPassword
        })
    }).then(async response => {
        if (response.ok) {

            console.log('response ok');

            let arr = await response.json();

            console.log(arr);

            return arr;
        }
    }).then(resolved => {

        console.log('resolved');
        data = resolved;
        document.getElementById('logged-id').innerHTML = userName;
        $('#block-login-not-logged').toggleClass('d-none');
        $('#block-login-logged').toggleClass('d-none');
        showNotes(userName);
        localStorage["yourUser"] = userName;


    }, rejected => {
        console.log('hahaha');

        console.log('rejected');
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



let btnModalLogin = document.getElementById('btn-modal-login');

// btnModalLogin.addEventListener('click', getModalLogin);

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

btnLogOut.addEventListener('click', funcLogout);


let btnAddNote = document.getElementById('btn-add-note');

btnAddNote.addEventListener('click', addNote);

let btnAddList = document.getElementById('btn-add-list');

btnAddList.addEventListener('click', addList);


let inputCancelLogin = document.getElementById('inputCancelLogin');

inputCancelLogin.addEventListener('click', addList);


$(".nav li").each(function (i) {
    $(".nav li:eq(" + i + ") a").click(function () {
        console.log('hi');
        $('.nav li a').removeClass("active");
        $('.nav li:eq(' + i + ') a').addClass("active");
        return false;
    });
});

let btnShowAll = document.getElementById('btn-show-all');

btnShowAll.addEventListener('click', function () {


        $('.card-item').show();
        return false;

});


let btnShowNotes = document.getElementById('btn-show-notes');

btnShowNotes.addEventListener('click', function () {

        console.log('hi notes');
        $('.card-item').hide();
        $('.notes-item').show();
        return false;

});

let btnShowLists = document.getElementById('btn-show-lists');

btnShowLists.addEventListener('click', function () {

        console.log('hi lists');
        $('.card-item').hide();
        $('.lists-item').show();
        return false;

});












