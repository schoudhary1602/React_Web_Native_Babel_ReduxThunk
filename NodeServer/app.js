var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDb = require('./DBConfig')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var registerRouter = require('./routes/RegisterUserRouter')
var authRouter = require('./routes/AuthUser')


var jwt = require('jsonwebtoken')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });


//===============================================================================
// JWT Verifier 
// oute middleware to authenticate and check token
//===============================================================================


const jwtverifier = function (req, res, next) {


  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['x-access-token']

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        next()
      }
    })

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })

  }
}

//===============================================================================
// Error handler
// oute middleware to authenticate and check token
//===============================================================================


let errorHandler = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({ 'message': err.message, status: (err.status || 500) })
}
let nocache = function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  next()
}

app.use('/auth', authRouter);
app.use('/api/auth', authRouter)
app.use('/api/register', registerRouter, errorHandler)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});








module.exports = app;
