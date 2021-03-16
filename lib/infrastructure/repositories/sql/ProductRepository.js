'use strict';

const ProductRepository = require('../../../domain/Product/ProductRepository');

const {sequelize} = require('../../orm/sequelize/sequelize');

module.exports = class extends ProductRepository {

    constructor() {
        super();
        this.db = sequelize;
        this.model = this.db.model('products');
    }

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