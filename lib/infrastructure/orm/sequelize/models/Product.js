'use strict';

const sequelize = require('sequelize');

module.exports = class extends sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: DataTypes.DOUBLE
                },
            }, {
                sequelize,
                modelName: 'product'
            }
        )
    }

    static associate(models) {
        this.belongsToMany(models.UserModel, {through: 'user_products'});
    }
}
