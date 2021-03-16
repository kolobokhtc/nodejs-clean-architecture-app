'use strict';

const {UserModel, ProductModel, sequelize} = require('../../orm/sequelize/sequelize');
const User = require('../../../domain/User/User');
const Product = require('../../../domain/Product/Product');
const NullUser = require('../../../domain/User/NullUser');
const UserRepository = require('../../../domain/User/UserRepository');

module.exports = class extends UserRepository {

    constructor() {
        super();
        this.db = sequelize;
        this.model = UserModel;
    }

    async persist(userEntity) {
        const {firstName, lastName, email, password} = userEntity;
        const seqUser = await this.model.build({firstName, lastName, email, password});
        await seqUser.save();

        return new User(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
    }

    async merge(userEntity) {
        const seqUser = await this.model.findByPk(userEntity.id);

        if (!seqUser) return false;

        const {firstName, lastName, email, password} = userEntity;
        await seqUser.update({firstName, lastName, email, password});

        return new User(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
    }

    async remove(userId) {
        const seqUser = await this.model.findByPk(userId);
        if (seqUser) {
            return seqUser.destroy();
        }
        return false;
    }

    async get(userId) {
        const seqUser = await this.model.findByPk(userId);
        if (!seqUser) return new NullUser();
        return new User(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
    }

    async getProducts(userId) {
        const seqUser = await this.model.findByPk(userId, {include: ProductModel});
        if (!seqUser) return null;

        return seqUser.products.map((item) => {
            return new Product(item.name, item.price);
        })
    }

    async getByEmail(userEmail) {
        const seqUser = await this.model.findOne({where: {email: userEmail}});
        if (!seqUser) return new NullUser();
        return new User(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
    }

    async find() {
        const seqUsers = await this.model.findAll();
        return seqUsers.map((seqUser) => {
            return new User(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
        });
    }

};
