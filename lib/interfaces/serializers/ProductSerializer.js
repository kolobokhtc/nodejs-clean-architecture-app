'use strict';

const _serializeSingleUser = (data) => {
    return {
        'id': data.id,
        'name': data.name,
        'price': data.price,
    };
};

module.exports = class {

    serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleUser);
        }
        return _serializeSingleUser(data);
    }

};