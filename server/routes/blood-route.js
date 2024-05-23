const express = require('express');
const controllers = require('../controllers/blood-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post('/create', verifyToken, verifyAdmin, controllers.createBlood);
router.post('/update/:id', verifyToken, verifyAdmin, controllers.updateBlood);
router.get('/get/:id', controllers.getBlood);
router.get('/getall', controllers.getAllBlood);

module.exports = router;
