const Sequelize = require('sequelize');
const database = require('../../config/db');
const users = require('./users');
const products = require('./cameraStore');

const cart = database.getInstance().define('cart', {
  quantity: {
    type: Sequelize.BIGINT,
    defaultValue: 1,
  },
});

users.belongsToMany(products, { through: 'cart' });
products.belongsToMany(users, { through: 'cart' });
users.hasMany(cart, {
});
cart.belongsTo(users);
products.hasMany(cart, {
});
cart.belongsTo(products);

module.exports = cart;
