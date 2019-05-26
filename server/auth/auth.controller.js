const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');

// sample user, used for authentication
// const user = {
//   username: 'react',
//   password: 'express'
// };

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  User.findOne({ username: req.body.email }, (error, user) => {
    if (error) {
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
      return next(err);
    }

    // test a matching password
    user.comparePassword(req.body.password, (error, isMatch) => {
      if (error) {
        const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
        return next(err);
      }
      if (isMatch) {
        const token = jwt.sign({
          username: user.username,
          type: user.type
        }, config.jwtSecret);
        return res.json({
          token,
          username: user.username,
          type: user.type
        });
      }
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
      return next(err);
    });
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber };
