
'use strict'
const dbInfo = require('../config')
const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    return sequelize.define(dbInfo.TABLE_USER, {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING,
            required: true
        },
        last_name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            required: true
        },
        phone_number: {
            type: Sequelize.STRING,
            required: true
        },
        password: {
            type: Sequelize.STRING,
            required: true
        },
        status: {
            type: Sequelize.INTEGER,
        },
        created_at: {
            type: Sequelize.DATE,
        },
        updated_at: {
            type: Sequelize.DATE,
        },
    }, {
            schema: dbInfo.DB_SCHEMA,
            tableName: dbInfo.TABLE_USER,
            timestamps: false,
        })
}