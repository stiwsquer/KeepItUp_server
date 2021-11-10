const { saveWorkoutMiddleware } = require('./workoutMiddleware');

const { authRole, authenticateToken } = require('../globalMiddleware');
const { ROLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.post(
  '/workout',
  authenticateToken,
  authRole(ROLE.COACH),
  saveWorkoutMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);
