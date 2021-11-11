const jwt = require('jsonwebtoken');
const { countExercises } = require('../service/exerciseService');
const { ROLE, TABLE } = require('./roles');

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.sendStatus(403);
    }
    return next();
  };
}

function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  if (token == null) return res.sendStatus(401);
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  });
}

function setCoachId(req, res, next) {
  if (req.user.role === ROLE.COACH) {
    req.coachId = req.user.id;
  } else {
    req.coachId = req.user.coach;
  }

  return next();
}

function paginatedResults(model) {
  return async (req, res, next) => {
    const results = {};
    if (!req.query.page || !req.query.limit) {
      res.paginatedResults = results;
      return next();
    }
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let count;

    /* TODO: create methods for counting entities with params */
    if (model === TABLE.EXERCISE) {
      count = await countExercises();
    } else if (model === TABLE.CLIENT) {
      count = await countExercises();
    }

    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    req.startIndex = startIndex;
    req.limit = limit;
    res.paginatedResults = results;
    return next();
  };
}

module.exports = {
  authRole,
  authenticateToken,
  setCoachId,
  paginatedResults,
};
