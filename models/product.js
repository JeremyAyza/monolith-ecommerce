


const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");
const OrderItem = require("./orderItem");

const Product = sequelize.define("product", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: DataTypes.STRING,
	description: DataTypes.STRING,
	imageUrl: DataTypes.STRING,
	price: DataTypes.DOUBLE,
	stock: DataTypes.INTEGER
}, {
	// solo se devolverán las siguientes propiedades
	tableName:"product",
	attributes: ['id', 'title', 'price', 'imageUrl', 'description', 'stock']
}
);


module.exports = Product;