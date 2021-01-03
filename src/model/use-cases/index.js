const products = require('../entities/cameraStore');
const user = require('../entities/users');
const cart = require('../entities/cart');
const { logger } = require('../../config/logger');

const getProductData = async () => {
  try {
    const getData = await products.findAll({
      raw: true,
    });
    if (getData) {
      return getData;
    }
    return {};
  } catch (error) {
    logger.error(error);
    return {};
  }
};

const getCartByID = async (userId) => {
  try {
    const getData = await cart.findAll({
      where: {
        userId,
      },
      include: [user, products],
      raw: true,
    });
    if (getData) {
      return getData;
    }
    return {};
  } catch (error) {
    logger.error(error);
    return {};
  }
};

// only admin can insert data in product table
const insertProductData = async (data) => {
  try {
    const insertedData = await products.create(data);
    if (insertedData) {
      return insertedData;
    }
    return null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const insertProductInCart = async (userId, productId) => {
  try {
    const findProduct = await products.findOne({
      where: {
        id: productId,
      },
      raw: true,
    });

    if (findProduct) {
      const findInCart = await cart.findOne({
        where: {
          userId,
          productId,
        },
        raw: true,
      });
      if (findInCart) {
        const updateQuantity = await cart.update({
          quantity: findInCart.quantity + 1,
        }, {
          where: {
            userId,
            productId,
          },
          raw: true,
        });
        if (updateQuantity[0] == 1) {
          return 1;
        }
        return null;
      }
      const insertedData = await cart.create({
        userId,
        productId,
      });
      if (insertedData) {
        return insertedData;
      }
      return null;
    }
    return null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

// only that user can delete this request in cart which has inserted this product in cart...
const deleteCartData = async (userId, productId) => {
  try {
    const deletedData = await cart.destroy({
      where: {
        userId,
        productId,
      },
    });
    if (deletedData == 1) {
      return deletedData;
    }
    return null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

module.exports = {
  getProductData, getCartByID, insertProductData, deleteCartData, insertProductInCart,
};
