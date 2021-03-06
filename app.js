const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');




const expressValidator = require('express-validator');

const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

require('./passport');
const config = require('./config');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');



mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
global.User = require('./models/user');
global.Task = require('./models/task');

const app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;


var server = app.listen(9000);

var options = {
	debug: true,
};

app.use('/api', ExpressPeerServer(server, options));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(cookieParser());
app.use(session({
  secret: config.sessionKey,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});



app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', taskRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
