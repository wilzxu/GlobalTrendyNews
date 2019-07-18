var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');

var app = express();

var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

// pass the authenticaion checker middleware
var authCheckMiddleware = require('./auth/auth_checker');

// view engine setup
app.set('views', path.join(__dirname, '../client/build'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));

app.use(passport.initialize());
passport.use('local-signup', require('./auth/signup_passport'));
passport.use('local-login', require('./auth/login_passport'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/news', authCheckMiddleware);
app.use('/news', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.status(404);
});

module.exports = app;