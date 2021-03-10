'use strict';

const User = require('./User');

module.exports = class extends User {

    constructor(id = null, firstName, lastName, email, password) {
        super();

        this.id = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.password = null;
    }

    isEmpty = () => {
        return true;
    }

};