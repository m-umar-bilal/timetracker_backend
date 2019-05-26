const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


/**
 * Timelog Schema
 */
const TimelogSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
TimelogSchema.pre('validate', function(next) {
  if (this.startTime > this.endTime) {
    next(new Error('End Time must be greater than Start Time'));
  } else {
    next();
  }
});
/**
 * Methods
 */
// TimelogSchema.method({
// });
/**
 * Statics
 */
TimelogSchema.statics = {
  /**
   * Get timelog
   * @param {ObjectId} id - The objectId of timelog.
   * @returns {Promise<Timelog, APIError>}
   */
  get(id) {
    return this.findById(id).populate('project')
      .exec()
      .then((timelog) => {
        if (timelog) {
          return timelog;
        }
        const err = new APIError('No such timelog exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List timelogs in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of timelogs to be skipped.
   * @param {number} limit - Limit number of timelogs to be returned.
   * @returns {Promise<Timelog[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Timelog
 */
module.exports = mongoose.model('Timelog', TimelogSchema);
