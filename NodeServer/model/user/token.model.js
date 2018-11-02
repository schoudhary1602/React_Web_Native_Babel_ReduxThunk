
'use strict'
const dnInfo = require('../config')
const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    return sequelize.define(dnInfo.TABLE_TOKEN, {
        token_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        token: {
            type: Sequelize.STRING(1234),
        },
        token_expiry: {
            type: Sequelize.INTEGER,
        },
        active: {
            type: Sequelize.STRING,
        },
        created_at: {
            type: Sequelize.DATE,
        },
        updated_at: {
            type: Sequelize.DATE,
        },
    }, {
            schema: dnInfo.DB_SCHEMA,
            tableName: dnInfo.TABLE_TOKEN,
            timestamps: false,
        })
}