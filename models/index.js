const Order = require("./order");
const OrderItem = require("./orderItem");
const Product = require("./product");
const User = require("./user");



Order.belongsTo(User);
User.hasMany(Order);
OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

module.exports = { Order, OrderItem,Product,User}