const {
  // get, insert, destroy, update,
  getAll, getById, insertDataInProduct, insertDataInCart, destroy,
} = require('../../src/controller');
const fixtures = require('../fixtures/controller_use-case.integration');

describe('Controllers tests', () => {
  beforeAll(async () => {
    await fixtures.add();
  });

  afterAll(async () => {
    await fixtures.remove();
  });

  it('Getting product details from controllers', async () => {
    const res = {
      send(param) {
        expect(global.getFindAll).toBe(param);
      },
      status(code) {
        expect(200).toBe(code);
      },
    };
    await getAll({}, res);
  });

  it('Getting cart details from controllers', async () => {
    const req = {
      body: { productId: 1 },
      user: { id: 1 },
    };
    const res = {
      send(param) {
        expect(global.getFindAllCart).toBe(param);
      },
      status(code) {
        expect(200).toBe(code);
      },
    };
    await getById(req, res);
  });

  it('Inserting product details from controllers', async () => {
    const req = {
      body: {
        name: 'crown camera',
        description: 'It is great camera',
        make: '2021-06-09',
        price: 908888,
      },
    };
    const res = {
      send(param) {
        expect(global.getCreate).toBe(param);
      },
      status(code) {
        expect(200).toBe(code);
      },
    };
    await insertDataInProduct(req, res);
  });

  // it('Inserting cart details from controllers', async () => {
  //   const req = {
  //     body: {
  //       productId: '1',
  //     },
  //     user: { id: 1 },
  //   };
  //   const res = {
  //     send(param) {
  //       expect(global.getCreateCart).toBe(param);
  //     },
  //     status(code) {
  //       expect(200).toBe(code);
  //     },
  //   };
  //   await insertDataInCart(req, res);
  // });

  it('Deleting cart details from controllers', async () => {
    const req = {
      query: { productId: 1 },
      user: { id: 1 },
    };
    const res = {
      send(param) {
        expect('Data deleted successfully').toBe(param);
      },
      status(code) {
        expect(200).toBe(code);
      },
    };
    await destroy(req, res);
  });
});
