'use strict';

module.exports = ({repository}) => {
    return repository.user().find();
};
