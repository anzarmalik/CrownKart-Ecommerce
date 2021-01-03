const express = require('express');
const passport = require('passport');
const User = require('../model/entities/users');
const {
  initializePassport, authLogin, auth, registerUser, authAdmin,
} = require('../middleware/auth');

const router = express.Router();
const {
  getAll, getById, insertDataInProduct, insertDataInCart, destroy: deleteData,
} = require('../controller');

initializePassport(passport, async (email) => {
  const data = await User.findOne({ where: { email } });
  return data;
},
async (id) => {
  const data = await User.findOne({ where: { id } });
  return data;
});

// get all products
router.get('/all', auth, getAll);

// get data from Cart By giving productId
router.get('/', auth, getById);

// insert data in product table by Admin
router.post('/insert', authAdmin, insertDataInProduct);

// insert data in cart table
router.post('/', auth, insertDataInCart);

// delete data from cart
router.delete('/', auth, deleteData);

/* register User */
router.get('/register', authLogin, (req, res) => {
  res.render('register', { title: 'register' });
});

router.post('/register', authLogin, registerUser);

/* login User */
router.get('/login', authLogin, (req, res) => {
  res.render('login', { title: 'login' });
});

router.post('/login', authLogin, passport.authenticate('local', {
  successRedirect: '/all',
  failureRedirect: '/login',
  failureFlash: true,
}));

/* logout */
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

/* Auth ends */

module.exports = router;
