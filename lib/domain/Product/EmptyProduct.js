'use strict';

const Product = require('./Product');

module.exports = class extends Product {
    constructor() {
        super();
        this.name = null;
    }

    isEmpty() {
        return true;
    }
}