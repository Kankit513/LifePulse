const express = require('express');
const controllers = require('../controllers/admin-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.get('/getadminbloodrequesthistory', verifyToken, verifyAdmin, controllers.getAdminBloodRequestHistory);
router.get('/getadmindonationrequesthistory', verifyToken, verifyAdmin, controllers.getAdminDonationRequestHistory);
router.get('/getadminbloodrequeststatuscount', verifyToken, verifyAdmin, controllers.getAdminBloodRequestStatusCount);
router.get('/getadmindonationrequeststatuscount', verifyToken, verifyAdmin, controllers.getAdminDonationRequestStatusCount);
router.patch('/updateadminbloodrequeststatus/:id', verifyToken, verifyAdmin, controllers.updateAdminBloodRequestStatus);
router.patch('/updateadmindonationrequeststatus/:id', verifyToken, verifyAdmin, controllers.updateAdminDonationRequestStatus);
router.patch('/updatebloodgroupquantity/:id', verifyToken, verifyAdmin, controllers.updateBloodGroupQuantity);
router.get('/getallconsumers', verifyToken, verifyAdmin, controllers.getAllConsumers);
router.get('/getalldonors', verifyToken, verifyAdmin, controllers.getAllDonors);
router.get('/getallhospitals', verifyToken, verifyAdmin, controllers.getAllHospitals);
router.get('/getallorganisations', verifyToken, verifyAdmin, controllers.getAllOrganisations);

module.exports = router;
