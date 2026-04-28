const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const auth = require('../middleware/auth');

router.post('/', complaintController.submit);
router.get('/', complaintController.listComplaints);
router.put('/:id/resolve', complaintController.resolve);

module.exports = router;
