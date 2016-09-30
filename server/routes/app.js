var express = require('express');
var basicAuthParser = require('basic-auth-parser');
var router = express.Router();
var UserNote = require('../models/note').prod;
var User = require('../models/user').prod;
var Uuid = require('node-uuid');

var userMap = {}

router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/auth', function(req, res, next) {
    var token = Uuid.v1();
    var creds = basicAuthParser(req.headers.authorization);
    var username = creds.username;
    var password = creds.password;
    
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
