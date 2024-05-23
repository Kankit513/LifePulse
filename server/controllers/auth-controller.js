const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
  try {
    const exisitingUser = await User.findOne({ email: req.body.email });
    if (exisitingUser) {
      return next(errorHandler(401, 'User Already Exists!'));
    }
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json('User has been Created!');
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { role, email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(402, 'User not Found!'));

    if (validUser.role !== role) {
      return next(errorHandler(405, 'Role not Matched!'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(403, 'Invalid Username or Password!'));
    
    const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie('access_token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000 )})
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};