const chai = require('chai');
const assert = chai.assert;

const check = require('./main_test.js');


describe('Check if login/password is exist', () => {

    let expected = true;

    let login = 'Dmytro';
    let password = '123456';

    it("For login = " + login + " and password =  " + password + " result should be: " + expected, function () {
        assert.equal(check.checkUser(login, password), expected);
    });

    expected = false;

    login = 'Dmytro';
    password = '123';

    it("For login = " + login + " and incorrect password =  " + password + " result should be: " + expected, function () {
        assert.equal(check.checkUser(login, password), expected);
    });

    expected = false;

    login = 'sdsdsfsf';
    password = '123';

    it("For incorrect login = " + login + " and incorrect password =  " + password + " result should be: " + expected, function () {
        assert.equal(check.checkUser(login, password), expected);
    });


})