const Project = require('./project.model');

/**
 * Load project and append to req.
 */
function load(req, res, next, id) {
  Project.get(id)
    .then((project) => {
      req.project = project; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get project
 * @returns {Project}
 */
function get(req, res) {
  return res.json(req.project);
}

/**
 * Create new project
 * @property {string} req.body.title - The projectname of project.
 * @property {string} req.body.description - The description of project.
 * @property {string} req.body.status - The status of project.
 * @returns {Project}
 */
function create(req, res, next) {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  });

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

/**
 * Update existing project
 * @property {string} req.body.projectname - The projectname of project.
 * @property {string} req.body.mobileNumber - The mobileNumber of project.
 * @returns {Project}
 */
function update(req, res, next) {
  const project = req.project;
  if ('title' in req.body) project.title = req.body.title;
  if ('description' in req.body) project.description = req.body.description;
  if ('status' in req.body) { project.status = req.body.status; }

  project.save()
    .then(savedProject => res.json(savedProject))
    .catch(e => next(e));
}

/**
 * Get project list.
 * @property {number} req.query.skip - Number of projects to be skipped.
 * @property {number} req.query.limit - Limit number of projects to be returned.
 * @returns {Project[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Project.list({ limit, skip })
    .then(projects => res.json(projects))
    .catch(e => next(e));
}

/**
 * Delete project.
 * @returns {Project}
 */
function remove(req, res, next) {
  const project = req.project;
  project.remove()
    .then(deletedProject => res.json(deletedProject))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
