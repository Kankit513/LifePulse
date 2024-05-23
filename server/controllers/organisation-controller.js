const DonationRequest = require('../models/donation-request-model');
const { errorHandler } = require('../utils/error');

module.exports.createOrganisationDonationRequest = async (req, res, next) => {
  try {
    const organisationDonationRequest = await DonationRequest.create(req.body);
    return res.status(201).json(organisationDonationRequest);
  } catch (error) {
    next(error);
  }
};

module.exports.getOrganisationDonationRequestHistory = async (req, res, next) => {
  try {
    const organisationDonationRequestHistory = await DonationRequest.find({ userRef: req.params.id });
    if (!organisationDonationRequestHistory) {
      return next(errorHandler(404, 'No Any Blood Donation Request Found!'));
    }
    res.status(200).json(organisationDonationRequestHistory);
  } catch (error) {
    next(error);
  }
};

module.exports.getOrganisationDonationRequestStatusCount = async (req, res, next) => {
  try {
    const organisationTotalDonationRequests = await DonationRequest.countDocuments({ userRef : req.params.id });
    const organisationPendingDonationRequests = await DonationRequest.countDocuments({ userRef : req.params.id, status: 'Pending' });
    const organisationApprovedDonationRequests = await DonationRequest.countDocuments({ userRef : req.params.id, status: 'Approved' });
    const organisationRejectedDonationRequests = await DonationRequest.countDocuments({ userRef : req.params.id, status: 'Rejected' });

    res.status(200).json({
      organisationTotalDonationRequests,
      organisationPendingDonationRequests,
      organisationApprovedDonationRequests,
      organisationRejectedDonationRequests,
    });
  } catch (error) {
    next(error);
  }
};