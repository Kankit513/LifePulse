const express = require('express');
const controllers = require('../controllers/organisation-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.get('/getorganisationbloodrequesthistory/:id', verifyToken, verifyOrganisation, controllers.getOrganisationBloodRequestHistory);
router.get('/getorganisationbloodrequeststatuscount/:id', verifyToken, verifyOrganisation, controllers.getOrganisationBloodRequestStatusCount);

router.get('/getorganisationdonationrequesthistory/:id', verifyToken, verifyOrganisation, controllers.getOrganisationDonationRequestHistory);
router.get('/getorganisationdonationrequeststatuscount/:id', verifyToken, verifyOrganisation, controllers.getOrganisationDonationRequestStatusCount);

router.patch('/updateorganisationbloodrequeststatus/:id/:orgid', verifyToken, verifyOrganisation, controllers.updateOrganisationBloodRequestStatus);
router.patch('/updateorganisationdonationrequeststatus/:id/:orgid', verifyToken, verifyOrganisation, controllers.updateOrganisationDonationRequestStatus);

router.patch('/updatebloodgroupquantity/:id', verifyToken, verifyOrganisation, controllers.updateBloodGroupQuantity);

module.exports = router;
