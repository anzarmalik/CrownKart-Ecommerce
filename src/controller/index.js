const {
  getProductData, getCartByID, insertProductData, deleteCartData, insertProductInCart,
} = require('../model/use-cases');
const { logger } = require('../config/logger');
const { errorObj } = require('../config/errors.json');

const getAll = async (req, res) => {
  try {
    const getData = await getProductData();
    if (getData.length > 0) {
      res.status(200);
      res.send(getData);
    } else {
      res.status(500);
      res.send('Camera store is empty , Only Admin can insert data in Product Camera Store');
    }
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const getById = async (req, res) => {
  try {
    const getData = await getCartByID(req.user.id);
    if (getData.length > 0) {
      res.status(200);
      res.send(getData);
    } else {
      res.status(500);
      res.send('Cart is empty for this user');
    }
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const insertDataInProduct = async (req, res) => {
  try {
    const data = {
      name: req.body.name || ' name missing! ',
      description: req.body.description || ' description missing! ',
      price: req.body.price || ' price missing! ',
      make: req.body.make || ' make date missing! ',
    };
    const insertData = await insertProductData(data);

    if (insertData) {
      res.status(200);
      res.send(insertData);
    } else {
      res.status(500);
      res.send(errorObj);
    }
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const insertDataInCart = async (req, res) => {
  try {
    const insertData = await insertProductInCart(req.user.id, req.body.productId);

    if (insertData && insertData != 1) {
      res.status(200);
      res.send(insertData);
    } else if (insertData && insertData == 1) {
      res.status(200);
      res.send('Quantity Incremented Successfully ...');
    } else {
      res.status(500);
      res.send(errorObj);
    }
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

const destroy = async (req, res) => {
  try {
    const deleteData = await deleteCartData(req.user.id, req.query.productId);

    if (deleteData) {
      res.status(200);
      res.send('Data deleted successfully');
    } else {
      res.status(500);
      res.send(errorObj);
    }
  } catch (error) {
    logger.error(error);
    res.status(500);
    res.send(error);
  }
};

module.exports = {
  getAll, getById, insertDataInProduct, insertDataInCart, destroy,
};
