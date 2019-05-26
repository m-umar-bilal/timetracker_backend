const Timelog = require('./timelog.model');

/**
 * Load timelog and append to req.
 */
function load(req, res, next, id) {
  Timelog.get(id)
    .then((timelog) => {
      req.timelog = timelog; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get timelog
 * @returns {Timelog}
 */
function get(req, res) {
  return res.json(req.timelog);
}

/**
 * Create new timelog
 * @property {string} req.body.timelogname - The timelogname of timelog.
 * @property {string} req.body.mobileNumber - The mobileNumber of timelog.
 * @returns {Timelog}
 */
function create(req, res, next) {
  const timelog = new Timelog({
    projectId: req.body.projectId,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description
  });

  timelog.save()
    .then(savedTimelog => res.json(savedTimelog))
    .catch(e => next(e));
}

/**
 * Update existing timelog
 * @property {string} req.body.timelogname - The timelogname of timelog.
 * @property {string} req.body.mobileNumber - The mobileNumber of timelog.
 * @returns {Timelog}
 */
function update(req, res, next) {
  const timelog = req.timelog;
  if ('projectId' in req.body) timelog.projectId = req.body.projectId;
  if ('startTime' in req.body) timelog.startTime = req.body.startTime;
  if ('endTime' in req.body) timelog.endTime = req.body.endTime;
  if ('description' in req.body) timelog.description = req.body.description;

  timelog.save()
    .then(savedTimelog => res.json(savedTimelog))
    .catch(e => next(e));
}

/**
 * Get timelog list.
 * @property {number} req.query.skip - Number of timelogs to be skipped.
 * @property {number} req.query.limit - Limit number of timelogs to be returned.
 * @returns {Timelog[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Timelog.list({ limit, skip })
    .then(timelogs => res.json(timelogs))
    .catch(e => next(e));
}

/**
 * Delete timelog.
 * @returns {Timelog}
 */
function remove(req, res, next) {
  const timelog = req.timelog;
  timelog.remove()
    .then(deletedTimelog => res.json(deletedTimelog))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
