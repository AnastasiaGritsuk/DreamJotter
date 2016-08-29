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
    console.log("Get token " + token);
    var user = userMap[token];
    var key = req.params.key;
    var result = [];

    console.log("Get key " + key);
    console.log("Get user " + user);
    console.log("Get savedNotes " + savedNotes[user]);
    if(user) {
        for (var i=0;i<savedNotes[user].length;i++){
            if(savedNotes[user][i].name === key) {
                result.push(savedNotes[user][i]);
            }
        }

        console.log("Get result " + result);
       
        if(result.length > 0) {
            return res.status(200).json({
                message:'Data fetched successfully!',
                data: result
            });
        } else {
            return res.status(200).json({
                message:'not found'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Bad request'
        });
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
