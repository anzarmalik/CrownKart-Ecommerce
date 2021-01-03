const Sequelize = require('sequelize');
const database = require('../../config/db');

const user = database.getInstance().define('user', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: Sequelize.ENUM('ADMIN', 'CUSTOMER'),
    defaultValue: 'CUSTOMER',
  },
  name: Sequelize.STRING,
  username: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: null,
  },
  password: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
  },

});

module.exports = user;
