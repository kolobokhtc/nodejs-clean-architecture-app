'use strict';

const UsersController = require('../controllers/UsersController');
const UsersCreateValidation = require('../../infrastructure/validations/user/create');

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
                        payload: UsersCreateValidation
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
                },
            },
            {
                method: 'DELETE',
                path: '/users/{id}',
                handler: UsersController.deleteUser,
                options: {
                    description: 'Delete a user',
                    tags: ['api'],
                },
            },
        ]);
    }
};