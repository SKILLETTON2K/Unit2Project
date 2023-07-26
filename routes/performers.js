const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/performers/new', ensureLoggedIn, performersCtrl.new);
router.post('/performers', ensureLoggedIn, performersCtrl.create);
router.post('/restaurants/:id/performers', ensureLoggedIn, performersCtrl.addToCast);

module.exports = router;