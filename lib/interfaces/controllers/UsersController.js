'use strict';

const Boom = require('@hapi/boom');
const ListUsers = require('../../application/use_cases/user/List');
const CreateUser = require('../../application/use_cases/user/Create');
const GetUser = require('../../application/use_cases/user/Get');
const DeleteUser = require('../../application/use_cases/user/Delete');

const CreateUserValidation = require('../../infrastructure/validations/user/create')

module.exports = {

    async createUser(request) {

        const serviceLocator = request.server.app.serviceLocator;

        const {firstName, lastName, email, password} = request.payload;

        const user = await CreateUser(firstName, lastName, email, password, serviceLocator);

        return serviceLocator.userSerializer.serialize(user);
    },

    async findUsers(request) {

        const serviceLocator = request.server.app.serviceLocator;

        const users = await ListUsers(serviceLocator);

        return users.map(serviceLocator.userSerializer.serialize)
    },

    async getUser(request) {

        const serviceLocator = request.server.app.serviceLocator;

        const userId = request.params.id;

        const user = await GetUser(userId, serviceLocator);

        if (!user) {
            return Boom.notFound();
        }
        return serviceLocator.userSerializer.serialize(user);
    },

    async deleteUser(request, handle) {

        const serviceLocator = request.server.app.serviceLocator;

        const userId = request.params.id;

        await DeleteUser(userId, serviceLocator);

        return handle.response().code(204);
    },

};
