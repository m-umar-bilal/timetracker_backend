const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      type: Joi.string().required()
    }
  },

  // POST /api/projects
  createProject: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string().required()
    }
  },  // POST /api/timelogs
  createTimelog: {
    body: {
      projectId: Joi.string().hex().required(),
      startTime: Joi.date().required(),
      endTime: Joi.date().min(Joi.ref('startTime')).required(),
      description: Joi.string().required()
    }
  },
  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      type: Joi.string().required(),
      password: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
  // UPDATE /api/users/:projectId
  updateProject: {
    body: {
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      status: Joi.string().allow('').optional()
    },
    params: {
      projectId: Joi.string().hex().required()
    }
  },
  // UPDATE /api/users/:timelogId
  updateTimelog: {
    body: {
      projectId: Joi.string().hex().optional(),
      startTime: Joi.date().optional(),
      endTime: Joi.date().min(Joi.ref('startTime')).optional(),
      description: Joi.string().optional()
    },
    params: {
      projectId: Joi.string().hex().required()
    }
  },
  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
