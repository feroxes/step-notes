module.exports.checkUser = (login, password) =>{

    let result = '';

    fetch('http://localhost:8000/checkUserData', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            login: 'Dmytro',
            password: '123456'
        })
    }).then(async response => {
        if (response.ok) {
            let arr = await response.json();
            return arr;
        }
    }).then(resolved => {
        result = true;

    }, rejected => {
        result = false;
    })

    return result;
}