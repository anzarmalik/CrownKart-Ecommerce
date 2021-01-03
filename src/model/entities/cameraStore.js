const Sequelize = require('sequelize');
const database = require('../../config/db');
// const users  = require('./users');

const product = database.getInstance().define('product', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.DOUBLE(9, 2),
  make: Sequelize.DATE(),
});

// users.hasMany(camStore,{
//   foreignKey: {
//     allowNull: false
//   }
// });
// camStore.belongsTo(users);

module.exports = product;
