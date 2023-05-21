
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const OrderItem = sequelize.define('orderItem', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	price: DataTypes.DOUBLE,
	qty: DataTypes.INTEGER,
	subtotal: DataTypes.DOUBLE
}	
);



module.exports = OrderItem;