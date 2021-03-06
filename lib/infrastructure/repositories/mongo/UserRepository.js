'use strict';

const User = require('../../../domain/User/User');
const MongooseUser = require('../../orm/mongoose/schemas/User');
const NullUser = require('../../../domain/User/NullUser');
const UserRepository = require('../../../domain/User/UserRepository');

module.exports = class extends UserRepository {

    constructor() {
        super();
    }

    async persist(userEntity) {
        const {firstName, lastName, email, password} = userEntity;
        const mongooseUser = new MongooseUser({firstName, lastName, email, password});
        await mongooseUser.save();
        return new User(mongooseUser.id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.email, mongooseUser.password);
    }

    async merge(userEntity) {
        const {id, firstName, lastName, email, password} = userEntity;
        const mongooseUser = MongooseUser.findByIdAndUpdate(id, {firstName, lastName, email, password});
        return new User(mongooseUser.id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.email, mongooseUser.password);
    }

    async remove(userId) {
        return MongooseUser.findOneAndDelete(userId);
    }

    async get(userId) {
        const mongooseUser = await MongooseUser.findById(userId);
        if (!mongooseUser) return new NullUser();
        return new User(mongooseUser.id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.email, mongooseUser.password);
    }

    async getByEmail(userEmail) {
        const mongooseUser = await MongooseUser.find({email: userEmail});
        if (!mongooseUser) return new NullUser();
        return new User(mongooseUser.id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.email, mongooseUser.password);
    }

    async find() {
        const mongooseUsers = await MongooseUser.find();
        return mongooseUsers.map((mongooseUser) => {
            return new User(mongooseUser.id, mongooseUser.firstName, mongooseUser.lastName, mongooseUser.email, mongooseUser.password);
        });
    }

};
