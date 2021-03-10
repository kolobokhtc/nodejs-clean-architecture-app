'use strict';

const constants = require('./constants');
const environment = require('./environment');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const UserSerializer = require('../../interfaces/serializers/UserSerializer');
const RepositoryFactory = require('../factories/RepositoryFactory')

function buildBeans() {

    return  {
        accessTokenManager: new JwtAccessTokenManager(),
        userSerializer: new UserSerializer(),
        repository: new RepositoryFactory()
    };

}

module.exports = buildBeans();
