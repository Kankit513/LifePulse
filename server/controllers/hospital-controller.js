const BloodRequest = require('../models/blood-request-model');
const { errorHandler } = require('../utils/error');

module.exports.createHospitalBloodRequest = async (req, res, next) => {
  try {
    const hospitalBloodRequest = await BloodRequest.create(req.body);
    return res.status(201).json(hospitalBloodRequest);
  } catch (error) {
    next(error);
  }
};

module.exports.getHospitalBloodRequestHistory = async (req, res, next) => {
  try {
    const hospitalBloodRequestHistory = await BloodRequest.find({ userRef : req.params.id }).populate('orgRef', 'organisationName');
    if (!hospitalBloodRequestHistory) {
      return next(errorHandler(404, 'No Any Blood Request Found!'));
    }
    res.status(200).json(hospitalBloodRequestHistory);
  } catch (error) {
    next(error);
  }
};

module.exports.getHospitalBloodRequestStatusCount = async (req, res, next) => {
  try {
    const hospitalTotalBloodRequests = await BloodRequest.countDocuments({ userRef : req.params.id });
    const hospitalPendingBloodRequests = await BloodRequest.countDocuments({ userRef : req.params.id, status: 'Pending' });
    const hospitalApprovedBloodRequests = await BloodRequest.countDocuments({ userRef : req.params.id, status: 'Approved' });
    const hospitalRejectedBloodRequests = await BloodRequest.countDocuments({ userRef : req.params.id, status: 'Rejected' });

    res.status(200).json({
      hospitalTotalBloodRequests,
      hospitalPendingBloodRequests,
      hospitalApprovedBloodRequests,
      hospitalRejectedBloodRequests,
    });
  } catch (error) {
    next(error);
  }
};