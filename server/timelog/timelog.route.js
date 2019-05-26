const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const timelogCtrl = require('./timelog.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/timelogs - Get list of timelogs */
  .get(timelogCtrl.list)

  /** POST /api/timelogs - Create new timelog */
  .post(validate(paramValidation.createTimelog), timelogCtrl.create);

router.route('/:timelogId')
  /** GET /api/timelogs/:timelogId - Get timelog */
  .get(timelogCtrl.get)

  /** PUT /api/timelogs/:timelogId - Update timelog */
  .put(validate(paramValidation.updateTimelog), timelogCtrl.update)

  /** DELETE /api/timelogs/:timelogId - Delete timelog */
  .delete(timelogCtrl.remove);

/** Load timelog when API with timelogId route parameter is hit */
router.param('timelogId', timelogCtrl.load);

module.exports = router;
