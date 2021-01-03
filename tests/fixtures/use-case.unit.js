const productTable = require('../../src/model/entities/cameraStore');
const cartTable = require('../../src/model/entities/cart');
const user = require('../../src/model/entities/users');

module.exports = {
  async add() {
    const getFindAll = [{
      id: 1,
      name: 'SOME_NAME',
      description: 'SOME_DESCRIPTION',
      make: '2021-01-03T09:43:15',
      createdAt: '2021-01-03T14:10:20.000Z',
      updatedAt: '2021-01-03T09:43:15.000Z',
    }];

    const getFindOne = [{
      userId: 1,
      quantity: 1,
      productId: 1,
      createdAt: '2021-01-03T14:10:20.000Z',
      updatedAt: '2021-01-03T09:43:15.000Z',
    }];

    const getCreate = {
      id: 1,
      name: 'SOME_NAME',
      description: 'SOME_DESCRIPTION',
      make: '2021-01-03T09:43:15',
      price: 3000,
      createdAt: '2021-01-03T14:10:20.000Z',
      updatedAt: '2021-01-03T09:43:15.000Z',
    };

    const getFindAllCart = [{
      userId: 1,
      quantity: 1,
      productId: 1,
      createdAt: '2021-01-03T14:10:20.000Z',
      updatedAt: '2021-01-03T09:43:15.000Z',
    }];

    const getCreateCart = {
      userId: 1,
      quantity: 1,
      productId: 1,
      createdAt: '2021-01-03T14:10:20.000Z',
      updatedAt: '2021-01-03T09:43:15.000Z',
    };

    const getUpdate = [1];
    const getDelete = 1;

    const getbelongsToMany = {};
    const gethasMany = {};
    const getbelongsTo = {};

    productTable.findAll.mockResolvedValue(getFindAll);
    productTable.create.mockResolvedValue(getCreate);
    cartTable.findAll.mockResolvedValue(getFindAllCart);
    cartTable.findOne.mockResolvedValue(getFindOne);
    cartTable.create.mockResolvedValue(getCreateCart);
    cartTable.update.mockResolvedValue(getUpdate);
    cartTable.destroy.mockResolvedValue(getDelete);
    user.belongsToMany.mockResolvedValue(getbelongsToMany);
    productTable.belongsToMany.mockResolvedValue(getbelongsToMany);
    user.hasMany.mockResolvedValue(gethasMany);
    productTable.hasMany.mockResolvedValue(gethasMany);
    cartTable.belongsTo.mockResolvedValue(getbelongsTo);

    global.getFindAll = getFindAll;
    global.getFindOne = getFindOne;
    global.getCreate = getCreate;
    global.getFindAllCart = getFindAllCart;
    global.getCreateCart = getCreateCart;
    global.getUpdate = getUpdate;
    global.getDelete = getDelete;
    global.getbelongsToMany = getbelongsToMany;
    global.gethasMany = gethasMany;
    global.getbelongsTo = getbelongsTo;
  },

  async remove() {
    productTable.findAll.mockReset();
    productTable.create.mockReset();
    cartTable.findAll.mockReset();
    cartTable.findOne.mockReset();
    cartTable.create.mockReset();
    cartTable.update.mockReset();
    cartTable.destroy.mockReset();
    user.belongsToMany.mockReset();
    productTable.belongsToMany.mockReset();
    user.hasMany.mockReset();
    productTable.hasMany.mockReset();
    cartTable.belongsTo.mockReset();

    delete global.getFindAll;
    delete global.getCreate;
    delete global.getFindAllCart;
    delete global.getFindOne;
    delete global.getCreateCart;
    delete global.getUpdate;
    delete global.getDelete;
    delete global.getbelongsToMany;
    delete global.gethasMany;
    delete global.getbelongsTo;
  },
};
