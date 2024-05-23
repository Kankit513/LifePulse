const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const User = require('../models/user-model');

module.exports.updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id){
      return next(errorHandler(401, 'You can only update your own account!'));
    }
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            hospitalName: req.body.hospitalName,
            organisationName: req.body.organisationName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: req.body.password,
          },
        },
        { new: true }
      );

      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };