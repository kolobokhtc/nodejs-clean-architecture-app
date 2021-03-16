'use strict';

module.exports = async (userId, {repository}) => {
    let user = await repository.user().get(userId);
    user.products = await repository.user().getProducts(userId);
    return user;

}