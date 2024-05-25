const DonationRequest = require('../models/donation-request-model');
const { errorHandler } = require('../utils/error');

module.exports.createDonorDonationRequest = async (req, res, next) => {
  try {
    const donorDonationRequest = await DonationRequest.create(req.body);
    return res.status(201).json(donorDonationRequest);
  } catch (error) {
    next(error);
  }
};

module.exports.getDonorDonationRequestHistory = async (req, res, next) => {
  try {
    const donorDonationRequestHistory = await DonationRequest.find({ userRef: req.params.id }).populate('orgRef', 'organisationName');
    if (!donorDonationRequestHistory) {
      return next(errorHandler(404, 'No Any Donation Request Found!'));
    }
    res.status(200).json(donorDonationRequestHistory);
  } catch (error) {
    next(error);
  }
};

module.exports.getDonorDonationRequestStatusCount = async (req, res, next) => {
  try {
    const donorTotalDonationRequests = await DonationRequest.countDocuments({ userRef : req.params.id });
    const donorPendingDonationRequests = await DonationRequest.countDocuments({ userRef : req.params.id, status: 'Pending' });
    const donorApprovedDonationRequests = await DonationRequest.countDocuments({ userRef : req.params.id, status: 'Approved' });
    const donorRejectedDonationRequests = await DonationRequest.countDocuments({ userRef : req.params.id, status: 'Rejected' });

    res.status(200).json({
      donorTotalDonationRequests,
      donorPendingDonationRequests,
      donorApprovedDonationRequests,
      donorRejectedDonationRequests,
    });
  } catch (error) {
    next(error);
  }
};