const Blood = require('../models/blood-model');
const { errorHandler } = require('../utils/error');

module.exports.createBlood = async (req, res, next) => {
  try {
    const blood = await Blood.create(req.body);
    return res.status(201).json(blood);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllBlood = async (req, res, next) => {
  const { orgid } = req.params;
  try {
    const allBlood = await Blood.find({orgRef : orgid});
    if (!allBlood) {
      return next(errorHandler(404, 'Blood Not Found!'));
    }
    res.status(200).json(allBlood);
  } catch (error) {
    next(error);
  }
};