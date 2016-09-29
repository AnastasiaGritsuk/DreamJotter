var express = require('express');
var basicAuthParser = require('basic-auth-parser');
var router = express.Router();
var UserNote = require('../models/note');
var User = require('../models/user');
var Uuid = require('node-uuid');

var db = require('../common/config').db;
var mongoose = require('mongoose');
var testConn = mongoose.createConnection(db.test);
var prodConn = mongoose.createConnection(db.prod);

var UserModelProd = testConn.model(User);
var UserModelTest = prodConn.model(User);

mongoose.connect(db.prod);

var userMap = {}

router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/auth', function(req, res, next) {
    var token = Uuid.v1();
    var creds = basicAuthParser(req.headers.authorization);
    var username = creds.username;
    var password = creds.password;

    User.count(function (err, count) {
        if (!err && count === 0) {
            populateDB();
        }else {
            User.findOne({username: username}, function (err, doc) {
                if(err) {
                    console.log('unhandled error');
                    throw  err;
                }
                if(doc) {
                    if(doc.password === password) {
                        userMap[token] = username;
                        doc.save();

                        return res.status(200).json({
                            data: token
                        });
                    }
                }
                return res.status(401).send('Unauthorized');
            });
        }
    });

    function populateDB() {
        console.log('population starts');

        var newuser = {
            username:  username,
            password: password,
            securityToken: token
        };
        var user = new User(newuser);
        user.save();

        return res.status(200).json({
            data: token
        });
    }
});

router.delete('/auth', function(req, res, next) {
    var token = req.headers.authorization;

    if(userMap[token])
        return res.status(200).send('Logout successful');
    return res.status(401).send('Unauthorized');
});


router.get('/note/:key', function(req, res, next) {
    var token = req.headers.authorization;
    var key = req.params.key;
    var result = [];
    var user = userMap[token];

    if(user) {
        UserNote.find({user: user, name: key}, function (err, doc) {
            if(err) throw  err;
            if(doc.length !== 0) {
                doc.forEach(function (note) {
                    result.push(note);
                });

                return res.status(200).json({
                    data: result
                });
            }
            return res.status(404).send('Not found');
        });
    } else
        return res.status(401).send('Unauthorized');
});

router.post('/note', function(req, res, next) {
    var token = req.headers.authorization;
    var note = {};
    note.name = req.body.name;
    note.text = req.body.text;
    
    var user = userMap[token];

    if(user) {
        note.user = user;
        var userNote = new UserNote(note);
        userNote.save();

        return res.status(200).send('Note has been saved');
    }

    return res.status(401).send('Unauthorized');
});

module.exports = router;
