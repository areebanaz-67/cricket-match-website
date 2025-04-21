const express = require('express');
const router = express.Router();
const playersController = require('../controllers/playersController');

router.get('/player', playersController.getPlayers);
router.get('/player:id', playersController.getPlayer);

module.exports = router;