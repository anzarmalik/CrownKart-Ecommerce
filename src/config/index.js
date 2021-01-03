require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const passport = require('passport');
const session = require('express-session');
const database = require('./db');

database.connect();
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');

const app = express();
const { logger, expressLogger } = require('./logger');

app.use(expressLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../../public')));
app.use(flash());
app.use(session({
  secret: 'secretSession',
  saveUninitialized: false,
  resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = { app, logger };
