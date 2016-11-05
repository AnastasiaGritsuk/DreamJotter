var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');
var app = express();

var mongoose = require('mongoose');
var db = require('../config').db;

mongoose.connect(db, function (error) {
    console.log('connect to ' + db);
    if(error)
        throw error;
});

// view engine setup
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../client/public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

app.use('/', appRoutes);

// error handlers

// default error message
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message || 'Something went wrong');
});

module.exports = app;