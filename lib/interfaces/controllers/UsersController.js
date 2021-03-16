'use strict';

const Boom = require('@hapi/boom');
const ListUsers = require('../../application/use_cases/user/List');
const CreateUser = require('../../application/use_cases/user/Create');
const GetUser = require('../../application/use_cases/user/GetWithProducts');
const DeleteUser = require('../../application/use_cases/user/Delete');
const GetProducts = require('../../application/use_cases/user/GetProducts');

module.exports = {

    async createUser(request) {

        const serviceLocator = request.server.app.serviceLocator;

        const {firstName, lastName, email, password} = request.payload;

        const user = await CreateUser(firstName, lastName, email, password, serviceLocator);

        return serviceLocator.serializer.user().serialize(user);
    },

    async findUsers(request) {

        const serviceLocator = request.server.app.serviceLocator;

        const users = await ListUsers(serviceLocator);

        return users.map(serviceLocator.serializer.user().serialize)
    },

    async getUser(request) {

        const serviceLocator = request.server.app.serviceLocator;

        const userId = request.params.id;

        const user = await GetUser(userId, serviceLocator);

        if (user.isEmpty()) {
            return Boom.notFound();
        }

        return user;
    },

    async getProducts(request) {

        const serviceLocator = request.server.app.serviceLocator;

        const userId = request.params.id;

        const items = await GetProducts(userId, serviceLocator);

        if (!items) {
            return Boom.notFound();
        }
        return items.map(serviceLocator.serializer.product().serialize);
    },

    async deleteUser(request, handle) {

        const serviceLocator = request.server.app.serviceLocator;

        const userId = request.params.id;

        await DeleteUser(userId, serviceLocator);

        return handle.response().code(204);
    },

};
