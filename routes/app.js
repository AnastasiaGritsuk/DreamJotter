var express = require('express');
var basicAuthParser = require('basic-auth-parser');
var router = express.Router();
var Note = require('../models/note');
var registerUsers = require('./registerUsers');

var securityToken = null;

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/note', function(req, res, next) {
    Note.find(function(err, notes) {
        if (err) {
            return res.status(500).json({
                message: 'Error while fetching data!'
            });
        }
        res.status(200).json({
            data: notes
        });
    });
});

router.post('/note', function(req, res, next) {
    var note = new Note({
    	name: req.body.name,
        text: req.body.text
    });

    note.save(function(err, result) {
    	if (err) {
    		return res.status(500).json({
    			message: 'Error while saving data!'
    		});
    	}

    	return res.status(200).json({
    		message:'Save data successfully!'
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
    
    if(registerUsers[username] === password) {
        userMap[guid] = username;

        for(var key in userMap) {
            console.log('Key ' + key + 'value '+ userMap[key]);
        }

       // securityToken = guid;

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
