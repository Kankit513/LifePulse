const express = require('express');
const controllers = require('../controllers/donor-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post('/createdonordonationrequest', verifyToken, verifyDonor, controllers.createDonorDonationRequest);
router.get('/getdonordonationrequesthistory/:id', verifyToken, verifyDonor, controllers.getDonorDonationRequestHistory);
router.get('/getdonordonationrequeststatuscount/:id', verifyToken, verifyDonor, controllers.getDonorDonationRequestStatusCount);

module.exports = router;
