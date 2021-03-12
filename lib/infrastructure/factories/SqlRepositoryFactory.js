const RepositoryFactory = require('./RepositoryFactory');

module.exports = class extends RepositoryFactory {
    constructor() {
        super();

        this.repositoryDir = 'sql/';
    }
}