const BloodRequest = require('../models/blood-request-model');
const { errorHandler } = require('../utils/error');

module.exports.createConsumerBloodRequest = async (req, res, next) => {
  try {
    const consumerBloodRequest = await BloodRequest.create(req.body);
    return res.status(201).json(consumerBloodRequest);
  } catch (error) {
    next(error);
  }
};

module.exports.getConsumerBloodRequestHistory = async (req, res, next) => {
  try {
    const consumerBloodRequestHistory = await BloodRequest.find({ userRef : req.params.id }).populate('orgRef', 'organisationName');
    if (!consumerBloodRequestHistory) {
      return next(errorHandler(404, 'No Any Blood Request Found!'));
    }
    res.status(200).json(consumerBloodRequestHistory);
  } catch (error) {
    next(error);
  }
};

module.exports.getConsumerBloodRequestStatusCount = async (req, res, next) => {
  try {
    const consumerTotalBloodRequests = await BloodRequest.countDocuments({ userRef : req.params.id });
    const consumerPendingBloodRequests = await BloodRequest.countDocuments({ userRef : req.params.id, status: 'Pending' });
    const consumerApprovedBloodRequests = await BloodRequest.countDocuments({ userRef : req.params.id, status: 'Approved' });
    const consumerRejectedBloodRequests = await BloodRequest.countDocuments({ userRef : req.params.id, status: 'Rejected' });

    res.status(200).json({
      consumerTotalBloodRequests,
      consumerPendingBloodRequests,
      consumerApprovedBloodRequests,
      consumerRejectedBloodRequests,
    });
  } catch (error) {
    next(error);
  }
};