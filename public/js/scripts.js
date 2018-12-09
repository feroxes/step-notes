function fieldAddUser() {
    fetch('http://localhost:8000/addUser').then(response => {
        response.text().then(function (text) {
            // document.getElementById('allTasks').innerHTML = response.json();
            document.getElementById('block_add_user').innerHTML = text;
        })
    })
}


function funcAddUser() {
    fetch('http://localhost:8000/api/addUser').then(response => {
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
    fetch('http://localhost:8000/addLists').then(response => {


    })
}


let data;
let arrNL = [];

function showNotes(login) {
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
                let desc = elem.content.decsription;

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


function checkUser () {

    let inputLogin = document.getElementById('input-login').value;

    let fetchLogin = 'http://localhost:8000/checkUser/' + inputLogin;

    fetch(fetchLogin).then(response => {
        if (response.ok) {
            console.log(response);

            let arr = response.json();

            console.log(arr);

            return arr;
        }
    }).then(resolved => {
        data = resolved;

            console.log('login exists');
        showNotes(inputLogin);




    }, rejected => {
        console.log('login doesnt exist');
    })


}



let btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener('click', checkUser);

let btnAddNote = document.getElementById('btn-add-note');

btnAddNote.addEventListener('click', addNote);

let btnAddList = document.getElementById('btn-add-list');

btnAddList.addEventListener('click', addList);



