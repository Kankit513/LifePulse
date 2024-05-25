const express = require('express');
const controllers = require('../controllers/blood-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post('/create/:orgid', verifyToken, verifyOrganisation, controllers.createBlood);
router.get('/getall/:orgid', verifyToken, controllers.getAllBlood);

module.exports = router;
