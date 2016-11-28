var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mainRoute = require('./routes/index');
var adminRoute = require('./routes/admin')
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

app.use('/', mainRoute);
app.use('/admin', adminRoute);

// error handlers

app.get('*', function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

// default error message
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message || 'Something went wrong');
});

module.exports = app;