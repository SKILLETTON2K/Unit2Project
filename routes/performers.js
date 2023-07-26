const express = require('express');
const router = express.Router();
const eventsCtrl = require('../controllers/events');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/events/new', ensureLoggedIn, eventsCtrl.new);
router.post('/events', ensureLoggedIn, eventsCtrl.create);
router.post('/restaurants/:id/events', ensureLoggedIn, eventsCtrl.addToCast);

module.exports = router;