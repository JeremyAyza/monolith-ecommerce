
require('dotenv').config();
const { Sequelize } = require('sequelize')
const {
	DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DIALECT
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: DIALECT
})

module.exports = { sequelize }
