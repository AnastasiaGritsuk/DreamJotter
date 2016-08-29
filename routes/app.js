var express = require('express');
var basicAuthParser = require('basic-auth-parser');
var router = express.Router();
var Note = require('../models/note');
var registerUsers = require('./registerUsers');
var savedNotes = require('./notesdb');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/note/:key', function(req, res, next) {
    var token = req.headers.authorization;
    console.log(token);
    var user = userMap[token];
    var key = ???
    
    if(user) {
        return res.status(200).json({
            message:'Data fetched successfully!',
            data: savedNotes[key]
        });
    } else {
        what the hell ?
    }
});

router.post('/note', function(req, res, next) {
    
    var note = {};
    note.name = req.body.name;
    note.text = req.body.text;

    var token = req.headers.authorization;
    var key = userMap[token];
    if(key) {
        if(!savedNotes[key]){
            savedNotes[key] = [note];
        } else {
            savedNotes[key].push(note);
        }     
    }

    return res.status(200).json({
        message:'Save data successfully!'
    })

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
    
    if(registerUsers[username] === password) {
        userMap[guid] = username;
        return res.status(200).json({
            message:'User is logged',
            userToken: guid
        });
    } 
    
    return res.status(500).json({
        message: 'User does not exist'
    });
    
});

router.delete('/auth', function(req, res, next) {
    var token = req.headers.authorization;
    if(userMap[token]) {
        delete userMap[token];

        return res.status(200).json({
            message:'User logout successfully!'
        });
    }

    return res.status(500).json({
        message: 'User does not exist'
    });

});

var userMap = {};

module.exports = router;
