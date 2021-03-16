'use strict';

const sequelize = require('sequelize');

module.exports = class extends sequelize.Model {

    static init(sequelize, DataTypes) {
        return super.init(
            {
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'user',
            }
        )
    }

    static associate(models) {
        this.belongsToMany(models.ProductModel, {through: 'user_products'});
    }
}
