'use strict';

module.exports = {

    SUPPORTED_DATABASE: {
        IN_MEMORY: 'in-memory',
        MONGO: 'mongo',
        POSTGRES: 'postgres',
        SQLITE: 'sqlite',
        MYSQL: 'mysql',
    },
    REPOSITORIES: {
        USER: 'UserRepository',
        PRODUCT: 'ProductRepository',
    },
    SERIALIZERS: {
        USER: 'UserSerializer',
        PRODUCT: 'ProductSerializer'
    }

};
