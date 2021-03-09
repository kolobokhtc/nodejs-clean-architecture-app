'use strict';

const jwt = require('jsonwebtoken');

const AccessTokenManager = require('../../application/security/AccessTokenManager');

module.exports = class extends AccessTokenManager {

    generate(payload) {
        return jwt.sign(payload, process.env.JWT_TOKEN_KEY || 'testSecretKey');
    }

    decode(accessToken) {
        return jwt.verify(accessToken, process.env.JWT_TOKEN_KEY || 'testSecretKey');
    }

};