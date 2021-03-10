'use strict';

module.exports = async (email, password, {repository, accessTokenManager}) => {
    const user = await repository.user().getByEmail(email);

    if (!user || user.password !== password) {
        throw new Error('Bad credentials');
    }

    return accessTokenManager.generate({uid: user.id});
};
