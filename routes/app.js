var express = require('express');
var basicAuthParser = require('basic-auth-parser');
var router = express.Router();
var UserNote = require('../models/note');
var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/note/:key', function(req, res, next) {
    var token = req.headers.authorization;
    console.log("Get token " + token);
    var key = req.params.key;
    var result = [];
    
    User.findOne({securityToken: token}, function (err, doc) {
        if(err) {
            throw  err;
        }

        if(doc) {
            var user = doc.username;

            UserNote.find({user: user, name: key}, function (err, doc) {
                doc.forEach(function (note) {
                    result.push(note);
                })
                console.log('RESULT ' + result);
                return res.status(200).json({
                    message:'Data fetched successfully!',
                    data: result
                });
            });
            
        }else {
            console.log('User is not authorized');
            return res.status(401).json({
                message: 'Bad request'
            });
        }
    });
});

router.post('/note', function(req, res, next) {
    var note = {};
    note.name = req.body.name;
    note.text = req.body.text;

    var token = req.headers.authorization;

    User.findOne({securityToken: token}, function (err, doc) {
        if(err) {
            throw  err;
        }
        if(doc) {
            note.user = doc.username;
            var userNote = new UserNote(note);
            userNote.save();
            return res.status(200).send('Note has been saved');
        }

        return res.status(401).json({
            message: 'User does not exist'
        });
    });
});

router.post('/auth', function(req, res, next) {
    var guid = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
    })();

    var guid = guid();

    var creds = basicAuthParser(req.headers.authorization);
    var username = creds.username;
    var password = creds.password;

    User.findOne({username: username}, function (err, doc) {
        if(err) {
            throw  err;
        }
        if(doc) {
            if(doc.password === password) {
                doc.securityToken = guid;
                console.log('queried ' + doc);
                doc.save();

                return res.status(200).json({
                    message: 'User is logged',
                    userToken: guid
                });
            } else {
                return res.status(401).json({
                    message: 'User does not exist'
                });
            }
        }

        return res.status(500).json({
            message: 'User does not exist'
        });
    });
});

router.delete('/auth', function(req, res, next) {
    var token = req.headers.authorization;

    User.findOne({securityToken: token}, function (err, doc) {
        if(err) {
            throw  err;
        }
        if(doc) {
            doc.securityToken = null;
            return res.status(200).json({
                message:'User logout successfully!'
            });
        }

        return res.status(401).json({
            message: 'User does not exist'
        });
    });
});


module.exports = router;
