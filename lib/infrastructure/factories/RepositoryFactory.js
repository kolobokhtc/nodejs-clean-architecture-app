'use strict';

const constants = require('../config/constants');

module.exports = class {

    constructor() {
        this.instances = [];
        this.repositoryDir = null;
    }

    user() {
        return this.get(constants.REPOSITORIES.USER);
    }

    get(repository) {

        if (!this.repositoryDir) {
            throw new Error('Setup repository dialect')
        }

        if (this.instances[repository]) {
            return this.instances[repository];
        }

        const requireRepository = require('../repositories/' + this.repositoryDir + repository);

        this.instances[repository] = new requireRepository();

        return this.instances[repository];

    }
}