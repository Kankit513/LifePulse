const express = require('express');
const controllers = require('../controllers/organisation-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post('/createorganisationdonationrequest', verifyToken, verifyOrganisation, controllers.createOrganisationDonationRequest);
router.get('/getorganisationdonationrequesthistory/:id', verifyToken, verifyOrganisation, controllers.getOrganisationDonationRequestHistory);
router.get('/getorganisationdonationrequeststatuscount/:id', verifyToken, verifyOrganisation, controllers.getOrganisationDonationRequestStatusCount);

module.exports = router;
