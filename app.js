require('dotenv').config();
var express = require('express');
var cors = require('cors');
var createError = require('http-errors');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var app = express();

app.use(express.json());

app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
var userRoute = require('./routes/userRoute');
var roleRoute = require('./routes/roleRoute');
var flightRoute = require('./routes/flightRoute');
var hotelRoute = require('./routes/hotelRoute');
var holidayPackageRoute = require('./routes/holidayPackageRoute')

// Connect routes 
app.use('/user', userRoute);
app.use('/role', roleRoute);
app.use('/flight', flightRoute);
app.use('/hotel', hotelRoute);
app.use('/package', holidayPackageRoute)

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

// DB Connection
mongoose.connect(process.env.MONGODB_CONNECTION_URL, { serverSelectionTimeoutMS: 60000 }).then(() => {
    console.log("DB Connected Successfully!");
}).catch((error) => {
    console.log(error);
})

module.exports = app;