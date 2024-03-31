var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session=require("express-session");
//ye session handling ke liye wali line hmesha static se upr use krte hai
let indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var empRouter = require('./routes/employee');
var tweetRouter = require('./routes/tweet');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
   secret:'Aarchi secretkey', //given by
   resave:true,  //don't save if no changes are made in req.session
   saveUninitialized:true //save a new session ,if unInitialized means the session

}))
app.use(express.static(path.join(__dirname, 'public'))); //static file ko serve krta hai
app.use("/uploads",express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/employee',empRouter);
app.use('/tweet', tweetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals-, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
