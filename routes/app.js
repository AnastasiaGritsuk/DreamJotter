var express = require('express');
var basicAuthParser = require('basic-auth-parser');
var router = express.Router();
var UserNote = require('../models/note');
var User = require('../models/user');
var Guid = require('guid');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/note/:key', function(req, res, next) {
    var token = req.headers.authorization;
    var key = req.params.key;
    var result = [];
    
    User.findOne({securityToken: token}, function (err, doc) {
        if(err) throw  err;
        if(doc) {
            var user = doc.username;

            UserNote.find({user: user, name: key}, function (err, doc) {
                if(err) throw  err;
                if(doc) {
                    doc.forEach(function (note) {
                        result.push(note);
                    });

                    return res.status(200).json({
                        data: result
                    });
                }
                return res.status(400).send('Bad request');
            });
        } else {
            return res.status(401).send('Unauthorized');
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
        return res.status(401).send('Unauthorized');
    });
});

router.post('/auth', function(req, res, next) {
    var token = Guid.create();
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
                        doc.securityToken = token;
                        doc.save();

                        return res.status(200).json({
                            userToken: token
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
            userToken: token
        });
    }
});

router.delete('/auth', function(req, res, next) {
    var token = req.headers.authorization;

    User.findOne({securityToken: token}, function (err, doc) {
        if(err) throw  err;
        if(doc) {
            doc.securityToken = null;
            return res.status(200).send('Logout successful');
        }
        return res.status(401).send('Unauthorized');
    });
});

module.exports = router;
