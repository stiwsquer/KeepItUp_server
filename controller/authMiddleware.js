const jwt = require('jsonwebtoken');
const { ROLE } = require('./roles');

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

module.exports = {
  authRole,
  authenticateToken,
  setCoachId,
};
