'use strict';

module.exports = (userId, {repository}) => {
    return repository.user().get(userId);
};
