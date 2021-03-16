'use strict';

const constants = require('./constants');
const environment = require('./environment');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const Serializer = require('../../interfaces/serializers/Serializer');
const InMemoryRepositoryFactory = require('../factories/InMemoryRepositoryFactory')
const MongoRepositoryFactory = require('../factories/MongoRepositoryFactory')
const SqlRepositoryFactory = require('../factories/SqlRepositoryFactory')

function buildBeans() {

    let beans = {
        accessTokenManager: new JwtAccessTokenManager(),
        repository: null,
        serializer: null
    };

    beans.serializer = new Serializer();

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
