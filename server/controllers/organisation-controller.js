const DonationRequest = require('../models/donation-request-model');
const BloodRequest = require('../models/blood-request-model');
const Blood = require('../models/blood-model');
const { errorHandler } = require('../utils/error');

module.exports.getOrganisationDonationRequestHistory = async (req, res, next) => {
  try {
    const organisationDonationRequestHistory = await DonationRequest.find({ orgRef: req.params.id });
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
    const organisationTotalDonationRequests = await DonationRequest.countDocuments({ orgRef : req.params.id });
    const organisationPendingDonationRequests = await DonationRequest.countDocuments({ orgRef : req.params.id, status: 'Pending' });
    const organisationApprovedDonationRequests = await DonationRequest.countDocuments({ orgRef : req.params.id, status: 'Approved' });
    const organisationRejectedDonationRequests = await DonationRequest.countDocuments({ orgRef : req.params.id, status: 'Rejected' });

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

module.exports.getOrganisationBloodRequestHistory = async (req, res, next) => {
  try {
    const organisationBloodRequestHistory = await BloodRequest.find({ orgRef: req.params.id }).populate('userRef', 'hospitalName');
    if (!organisationBloodRequestHistory) {
      return next(errorHandler(404, 'No Any Blood Donation Request Found!'));
    }
    res.status(200).json(organisationBloodRequestHistory);
  } catch (error) {
    next(error);
  }
};

module.exports.getOrganisationBloodRequestStatusCount = async (req, res, next) => {
  try {
    const organisationTotalBloodRequests = await BloodRequest.countDocuments({ orgRef : req.params.id });
    const organisationPendingBloodRequests = await BloodRequest.countDocuments({ orgRef : req.params.id, status: 'Pending' });
    const organisationApprovedBloodRequests = await BloodRequest.countDocuments({ orgRef : req.params.id, status: 'Approved' });
    const organisationRejectedBloodRequests = await BloodRequest.countDocuments({ orgRef : req.params.id, status: 'Rejected' });

    res.status(200).json({
      organisationTotalBloodRequests,
      organisationPendingBloodRequests,
      organisationApprovedBloodRequests,
      organisationRejectedBloodRequests,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOrganisationBloodRequestStatus = async (req, res, next) => {
  const { id } = req.params;
  const { orgid } = req.params;
  const { status } = req.body;
  try {
    const updatedBloodRequestStatus = await BloodRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedBloodRequestStatus) return next(errorHandler(403, 'Blood Donor Request Not Found' ));

    if (status === 'Approved') {
      const bloodGroup = updatedBloodRequestStatus.bloodGroup;
      const quantity = updatedBloodRequestStatus.quantity;

      const blood = await Blood.findOneAndUpdate(
        { orgRef: orgid, bloodGroup: bloodGroup },
        { $inc: { unit: -quantity } },
        { new: true, upsert: true }
      );

      if (!blood) {
        return next(errorHandler(404, 'Failed to Update Blood Quantity' ));
      }
    }
    res.status(200).json(updatedBloodRequestStatus);
  } catch (error) {
    next(error);
  }
};

module.exports.updateOrganisationDonationRequestStatus = async (req, res, next) => {
  const { id } = req.params;
  const { orgid } = req.params;
  const { status } = req.body;
  try {
    const updatedDonationRequestStatus = await DonationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedDonationRequestStatus) return next(errorHandler(403, 'Blood Donor Request Not Found' ));

    if (status === 'Approved') {
      const bloodGroup = updatedDonationRequestStatus.bloodGroup;
      const quantity = updatedDonationRequestStatus.quantity;

      const blood = await Blood.findOneAndUpdate(
        { orgRef: orgid, bloodGroup: bloodGroup },
        { $inc: { unit: quantity } },
        { new: true, upsert: true }
      );

      if (!blood) {
        return next(errorHandler(404, 'Failed to Update Blood Quantity' ));
      }
    }
    res.status(200).json(updatedDonationRequestStatus);
  } catch (error) {
    next(error);
  }
};

module.exports.updateBloodGroupQuantity = async (req, res, next) => {
  const { id } = req.params;
  const { unit } = req.body;
  try {
    const updatedBlood = await Blood.findByIdAndUpdate(
      id,
      { $inc: { unit: unit } },
      { new: true, upsert: true }
    );
    if (!updatedBlood) {
      return next(errorHandler(407, 'Blood Not Updated!'));
    }
    res.status(200).json(updatedBlood);
  } catch (error) {
    next(error);
  }
};