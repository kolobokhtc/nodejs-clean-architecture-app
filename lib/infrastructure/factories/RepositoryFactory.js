'use strict';

const environment = require('../config/environment');
const constants = require('../config/constants');

module.exports = class {

    constructor() {
        this.instances = [];
    }

    user() {
        return this.get(constants.REPOSITORIES.USER);
    }

    get(repository) {

        if (this.instances[repository]) {
            return this.instances[repository];
        }

        let repositoryDir = '';

        if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
            repositoryDir = 'inmemory/';
        } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
            repositoryDir = 'mongo/';
        } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES) {
            throw new Error('Add PostgreSQL support');
        } else {
            repositoryDir = 'sql/';
        }

        const requireRepository = require('../repositories/' + repositoryDir + repository);

        this.instances[repository] = new requireRepository();

        return this.instances[repository];

    }
}