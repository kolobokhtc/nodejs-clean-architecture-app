'use strict';

module.exports = class {
    get(productId) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    users(product_id) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    addUser(product_id, user_id) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

}