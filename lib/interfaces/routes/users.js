'use strict';

const UsersController = require('../controllers/UsersController');
const UsersCreateRequest = require('../../infrastructure/webserver/models/user/createRequest');
const UsersCreateResponse = require('../../infrastructure/webserver/models/user/createResponse');
const Joi = require("@hapi/joi");

module.exports = {
    name: 'users',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/users',
                config: {
                    handler: UsersController.findUsers,
                    description: 'List all users',
                    tags: ['api'],
                },
            },
            {
                method: 'POST',
                path: '/users',
                handler: UsersController.createUser,
                options: {
                    description: 'Create a user',
                    tags: ['api'],
                    validate: {
                        payload: UsersCreateRequest
                    },
                    response: {
                        schema: UsersCreateResponse
                    }
                },
            },
            {
                method: 'GET',
                path: '/users/{id}',
                handler: UsersController.getUser,
                options: {
                    description: 'Get a user by its {id}',
                    tags: ['api'],
                    validate: {
                        params: Joi.object({
                            id: Joi.number().integer()
                        })
                    }
                },
            },
            {
                method: 'DELETE',
                path: '/users/{id}',
                handler: UsersController.deleteUser,
                options: {
                    description: 'Delete a user',
                    tags: ['api'],
                    validate: {
                        params: Joi.object({
                            id: Joi.number().integer()
                        })
                    }
                },
            },
        ]);
    }
};