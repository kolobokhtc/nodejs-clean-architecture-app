'use strict';

const constants = require('./constants');
const environment = require('./environment');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const UserSerializer = require('../../interfaces/serializers/UserSerializer');
const InMemoryRepositoryFactory = require('../factories/InMemoryRepositoryFactory')
const MongoRepositoryFactory = require('../factories/MongoRepositoryFactory')
const SqlRepositoryFactory = require('../factories/SqlRepositoryFactory')

function buildBeans() {

    let beans = {
        accessTokenManager: new JwtAccessTokenManager(),
        userSerializer: new UserSerializer(),
        repository: null
    };

    if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
        beans.repository = new InMemoryRepositoryFactory();
    } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
        beans.repository = new MongoRepositoryFactory();
    } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES) {
        throw new Error('Add PostgreSQL support');
    } else {
        beans.repository = new SqlRepositoryFactory();
    }

    return beans;

}

module.exports = buildBeans();
