const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
router.get('/', restaurantsCtrl.index);
router.get('/new', ensureLoggedIn, restaurantsCtrl.new);
router.get('/:id', restaurantsCtrl.show);
router.post('/', ensureLoggedIn, restaurantsCtrl.create);
	
module.exports = router;
