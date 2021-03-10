'use strict';

const User = require('../../../domain/User/User');

module.exports = (firstName, lastName, email, password, {repository}) => {
    const user = new User(null, firstName, lastName, email, password);
    return repository.user().persist(user);
};
