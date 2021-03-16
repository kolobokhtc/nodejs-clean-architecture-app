'use strict';

module.exports = (userId, {repository}) => {
    return repository.user().getProducts(userId);
};
