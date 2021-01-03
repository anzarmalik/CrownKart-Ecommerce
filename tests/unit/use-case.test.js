const {
  getProductData, getCartByID, insertProductData, deleteCartData, insertProductInCart,
} = require('../../src/model/use-cases');
const fixtures = require('../fixtures/use-case.unit.js');

describe('Use Case tests', () => {
  beforeAll(async () => {
    await fixtures.add();
  });

  afterAll(async () => {
    await fixtures.remove();
  });

  it('Getting product details', async () => {
    const data = await getProductData();
    expect(global.getFindAll).toEqual(data);
  });

  it('Getting cart details', async () => {
    const data = await getCartByID();
    expect(global.getFindAllCart).toEqual(data);
  });

  it('Inserting product details', async () => {
    const data = await insertProductData();
    expect(global.getCreate).toEqual(data);
  });

  // it('Inserting cart details', async () => {
  //   const data = await insertProductInCart();
  //   expect(global.getCreateCart).toEqual(data);
  // });

  it('Deleting cart details', async () => {
    const data = await deleteCartData();
    expect(global.getDelete).toEqual(data);
  });
});
