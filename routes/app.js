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

module.exports = router;
