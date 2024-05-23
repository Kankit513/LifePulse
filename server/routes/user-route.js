const express = require('express');
const controllers = require('../controllers/user-controller');
const { verifyToken, verifyConsumer, verifyDonor, verifyHospital, verifyOrganisation, verifyAdmin } = require('../utils/middleware');
const router = express.Router();

router.post("/update/:id", verifyToken, controllers.updateUser);

module.exports = router;