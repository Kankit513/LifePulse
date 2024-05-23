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

module.exports.updateBlood = async (req, res, next) => {
  const blood = await Blood.findById(req.params.id);
  if (!blood) {
    return next(errorHandler(404, 'Blood not found!'));
  }
  try {
    const updatedBlood = await Blood.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBlood);
  } catch (error) {
    next(error);
  }
};

module.exports.getBlood = async (req, res, next) => {
  try {
    const blood = await Blood.findById(req.params.id);
    if (!blood) {
      return next(errorHandler(404, 'Blood not found!'));
    }
    res.status(200).json(blood);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllBlood = async (req, res, next) => {
  try {
    const allBlood = await Blood.find({});
    if (!allBlood) {
      return next(errorHandler(404, 'Blood Not Found!'));
    }
    res.status(200).json(allBlood);
  } catch (error) {
    next(error);
  }
};