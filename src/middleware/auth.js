const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/entities/users');
const { logger } = require('../config/logger');

function initializePassport(passport, emailVerified, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await emailVerified(email);
    if (user == null) {
      return done(null, false, { message: ' No User found with this Email' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: ' Password is incorrect ' });
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => { done(null, user.id); });
  passport.deserializeUser(async (id, done) => done(null, await getUserById(id)));
}

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function authAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role == 'ADMIN') {
    return next();
  }
  res.redirect('/login');
}

function authLogin(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/all');
  } else {
    // res.redirect("/login")
    return next();
  }
}

async function registerUser(req, res, next) {
  req.body = JSON.parse(JSON.stringify(req.body));
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      // console.log("user",user)
      if (user) {
        logger.warn(`user already taken    ${JSON.stringify(user)}`);
        res.send(`This user is already taken  -> ${req.body.email}`);
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          username: req.body.email,
          password: hashedPassword,
          role: req.body.role || 'CUSTOMER',
        })
          .then((user) => {
            // res.send('user created'+ JSON.stringify(user));
            console.log(`user created${JSON.stringify(user)}`);
            console.log('success');
            res.redirect('/login');
          })
          .catch((err) => {
            // print the error details
            logger.error(err);
          });
      }
    })
      .catch((err) => {
        logger.error(err);
        res.send(err);
      });
  } catch (error) {
    res.redirect('/register');
  }
}

module.exports = {
  initializePassport, authLogin, auth, registerUser, authAdmin,
};
