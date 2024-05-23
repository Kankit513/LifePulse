const BloodRequest = require('../models/blood-request-model');
const DonationRequest = require('../models/donation-request-model');
const Blood = require('../models/blood-model');
const User = require('../models/user-model');
const { errorHandler } = require('../utils/error');

module.exports.getAdminBloodRequestHistory = async (req, res, next) => {
    try {
      const adminBloodRequestHistory = await BloodRequest.find({}).populate('userRef', 'username hospitalName organisationName');
      // const adminBloodRequest = await BloodRequest.find({}).populate('userRef', 'username email role');;
      if (!adminBloodRequestHistory) {
        return next(errorHandler(401, 'No Any Blood Request Found!'));
      }
      res.status(200).json(adminBloodRequestHistory);
    } catch (error) {
      next(error);
    }
};

module.exports.getAdminDonationRequestHistory = async (req, res, next) => {
  try {
      const adminDonationRequestHistory = await DonationRequest.find({}).populate('userRef', 'username hospitalName organisationName');
      if (!adminDonationRequestHistory) {
        return next(errorHandler(402, 'No Any Blood Donation Request Found!'));
      }
      res.status(200).json(adminDonationRequestHistory);
  } catch (error) {
      next(error);
  }
};

module.exports.getAdminBloodRequestStatusCount = async (req, res, next) => {
  try {
    const adminTotalBloodRequests = await BloodRequest.countDocuments({});
    const adminPendingBloodRequests = await BloodRequest.countDocuments({ status: 'Pending' });
    const adminApprovedBloodRequests = await BloodRequest.countDocuments({ status: 'Approved' });
    const adminRejectedBloodRequests = await BloodRequest.countDocuments({ status: 'Rejected' });

    res.status(200).json({
      adminTotalBloodRequests,
      adminPendingBloodRequests,
      adminApprovedBloodRequests,
      adminRejectedBloodRequests,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAdminDonationRequestStatusCount = async (req, res, next) => {
  try {
    const adminTotalDonationRequests = await DonationRequest.countDocuments({});
    const adminPendingDonationRequests = await DonationRequest.countDocuments({ status: 'Pending' });
    const adminApprovedDonationRequests = await DonationRequest.countDocuments({ status: 'Approved' });
    const adminRejectedDonationRequests = await DonationRequest.countDocuments({ status: 'Rejected' });

    res.status(200).json({
      adminTotalDonationRequests,
      adminPendingDonationRequests,
      adminApprovedDonationRequests,
      adminRejectedDonationRequests,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateAdminBloodRequestStatus = async (req, res, next) => {
  const { id } = req.params;
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
        { bloodGroup },
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

module.exports.updateAdminDonationRequestStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedDonationRequestStatus = await DonationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedDonationRequestStatus) return next(errorHandler(405, 'Blood Donation Request Not Found' ));

    if (status === 'Approved') {
      const bloodGroup = updatedDonationRequestStatus.bloodGroup;
      const quantity = updatedDonationRequestStatus.quantity;

      const blood = await Blood.findOneAndUpdate(
        { bloodGroup },
        { $inc: { unit: quantity } },
        { new: true, upsert: true }
      );

      if (!blood) {
        return next(errorHandler(406, 'Failed to Update Blood Quantity' ));
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

module.exports.getAllConsumers = async (req, res, next) => {
  try {
    const allConsumers = await User.find({ role : 'consumer' })
    if (!allConsumers) {
      return next(errorHandler(409, 'No Any Consumer Found!'));
    }
    res.status(200).json(allConsumers);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllDonors = async (req, res, next) => {
  try {
    const allDonors = await User.find({ role : 'donor' })
    if (!allDonors) {
      return next(errorHandler(409, 'No Any Donor Found!'));
    }
    res.status(200).json(allDonors);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllHospitals = async (req, res, next) => {
  try {
    const allHospitals = await User.find({ role : 'hospital' })
    if (!allHospitals) {
      return next(errorHandler(408, 'No Any Hospital Found!'));
    }
    res.status(200).json(allHospitals);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllOrganisations = async (req, res, next) => {
  try {
    const allOrganisations = await User.find({ role : 'organisation' })
    if (!allOrganisations) {
      return next(errorHandler(409, 'No Any Organisation Found!'));
    }
    res.status(200).json(allOrganisations);
  } catch (error) {
    next(error);
  }
};

