'use strict';

const constants = require('../../infrastructure/config/constants');

module.exports = class {

    user() {
        return this.get(constants.SERIALIZERS.USER)
    }

    product() {
        return this.get(constants.SERIALIZERS.PRODUCT)
    }

    get(type) {
        const serializer = require('./' + type);
        return new serializer();
    }
}