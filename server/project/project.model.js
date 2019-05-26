const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


/**
 * Project Schema
 */
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: { unique: true }
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Ongoing', 'Completed'],
    default: 'Ongoing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { toJSON: { virtuals: true } });

ProjectSchema.virtual('timelogs', {
  ref: 'Timelog',
  localField: '_id',
  foreignField: 'projectId',
  justOne: false // set true for one-to-one relationship
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
/**
 * Methods
 */
// ProjectSchema.method({
// });

/**
 * Statics
 */
ProjectSchema.statics = {
  /**
   * Get project
   * @param {ObjectId} id - The objectId of project.
   * @returns {Promise<Project, APIError>}
   */
  get(id) {
    return this.findById(id).populate('timelogs')
      .exec()
      .then((project) => {
        if (project) {
          return project;
        }
        const err = new APIError('No such project exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Project[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .populate('timelogs')
      .exec();
  }
};

/**
 * @typedef Project
 */
module.exports = mongoose.model('Project', ProjectSchema);
