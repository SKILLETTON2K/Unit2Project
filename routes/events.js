const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	

router.get('/new', ensureLoggedIn, eventsCtrl.new);
router.get('events/:id', eventsCtrl.show);
router.post('/', ensureLoggedIn, eventsCtrl.create);
	
module.exports = router;