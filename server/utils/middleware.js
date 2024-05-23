const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error');

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log("token", token);
  if (!token) return next(errorHandler(401, 'You are not Authenticated!'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(402, 'Token is not Valid!'));

    req.user = user;
    // console.log("req.user", req.user);
    // console.log("user", user);
    next();
  });
};

module.exports.verifyConsumer = (req, res, next) => {
  if (req.user.role==='consumer' || req.user.role==='admin') {
    next();
  } else {
    return next(errorHandler(403, "You are not Authorized!"));
  }
};

module.exports.verifyDonor = (req, res, next) => {
  if (req.user.role === 'donor' || req.user.role === 'admin') {
    next();
  } else {
    return next(errorHandler(404, "You are not Authorized!"));
  }
};

module.exports.verifyHospital = (req, res, next) => {
    if (req.user.role === 'hospital' || req.user.role === 'admin') {
      next();
    } else {
      return next(errorHandler(405, "You are not Authorized!"));
    }
};

module.exports.verifyOrganisation = (req, res, next) => {
  if (req.user.role === 'organisation' || req.user.role === 'admin') {
    next();
  } else {
    return next(errorHandler(406, "You are not Authorized!"));
  }
};

module.exports.verifyAdmin = (req, res, next) => {
    if (req.user.role != 'admin') {
      return next(errorHandler(407, "You are not Authorized!"));
    } else {
      next();
    }
};