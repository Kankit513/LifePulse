const express = require('express');
const controllers = require('../controllers/hospital-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post('/createhospitalbloodrequest', verifyToken, verifyHospital, controllers.createHospitalBloodRequest);
router.get('/gethospitalbloodrequesthistory/:id', verifyToken, verifyHospital, controllers.getHospitalBloodRequestHistory);
router.get('/gethospitalbloodrequeststatuscount/:id', verifyToken, verifyHospital, controllers.getHospitalBloodRequestStatusCount);

module.exports = router;
