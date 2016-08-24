var express = require('express');
var router = express.Router();
var Note = require('../models/note')

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/notes', function(req, res, next) {
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

    	return res.status(201).json({
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

    var name = req.body.username;
    var pass = req.body.password;

    
    if(loggedUsers[name] === pass) {
        return res.status(200).json({
            message:'User is logged'
        });
    } 
    
    return res.status(500).json({
        message: 'User does not exist'
    });
    
});

module.exports = router;
