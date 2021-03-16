'use strict';

const {Sequelize} = require('sequelize');
const environment = require('../../config/environment');
const sequelize = new Sequelize(environment.database.url);

const UserModel = require('./models/User');
const ProductModel = require('./models/Product');

const models = {
    UserModel: UserModel.init(sequelize, Sequelize),
    ProductModel: ProductModel.init(sequelize, Sequelize),
}

Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models))

const orm = {
    ...models,
    sequelize
}

module.exports = orm;