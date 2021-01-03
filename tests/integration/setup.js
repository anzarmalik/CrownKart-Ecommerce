const database = require('../../src/config/db');

database.getInstance = jest.fn();

// global.product.findAll.mockResolvedValue(getFindAll);
database.getInstance.mockReturnValue({
  define: () => ({
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    belongsToMany: jest.fn(),
    hasMany: jest.fn(),
    belongsTo: jest.fn(),
  }),
});

global.database = database;
