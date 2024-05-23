const express = require('express');
const controllers = require('../controllers/consumer-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post('/createconsumerbloodrequest', verifyToken, verifyConsumer, controllers.createConsumerBloodRequest);
router.get('/getconsumerbloodrequesthistory/:id', verifyToken, verifyConsumer, controllers.getConsumerBloodRequestHistory);
router.get('/getconsumerbloodrequeststatuscount/:id', verifyToken, verifyConsumer, controllers.getConsumerBloodRequestStatusCount);

module.exports = router;
