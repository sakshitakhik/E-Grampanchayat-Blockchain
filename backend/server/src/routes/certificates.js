const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const auth = require('../middleware/auth');

router.post('/', certificateController.apply);
router.get('/', certificateController.listApplications);
router.get('/:id', certificateController.getApplication);
router.put('/:id/status', certificateController.updateStatus);
router.get('/:id/certificate', certificateController.getCertificate);

module.exports = router;
