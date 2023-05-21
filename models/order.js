const { Sequelize, DataTypes,  } = require("sequelize");
const { sequelize } = require("../utils/database");

const Order = sequelize.define('order', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	total: DataTypes.DOUBLE,
}
);


module.exports = Order;