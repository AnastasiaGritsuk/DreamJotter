var express = require('express');
var basicAuthParser = require('basic-auth-parser');
var router = express.Router();
var Note = require('../models/note')

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
    var loggedUsers = {
        '1user': '1234',
        '2user': '1234',
        '3user': '1234',
        '4user': '1234'
    }

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
    
    if(loggedUsers[username] === password) {
        securityToken = guid;

        return res.status(200).json({
            message:'User is logged',
            userToken: securityToken
        });
    } 
    
    return res.status(500).json({
        message: 'User does not exist'
    });
    
});

router.delete('/auth', function(req, res, next) {
    var token = req.headers.authorization;
    if(token == securityToken) {
        securityToken = null;

        return res.status(200).json({
            message:'User logout successfully!'
        });
    }

    return res.status(500).json({
        message: 'User does not exist'
    });

});

module.exports = router;
