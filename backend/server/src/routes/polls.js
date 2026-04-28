const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
const auth = require('../middleware/auth');

router.post('/', pollController.createPoll);
router.get('/', pollController.listPolls);
router.post('/:id/vote', pollController.vote);
router.get('/:id/results', pollController.getResults);

module.exports = router;
