const {
  saveWorkoutMiddleware,
  getAllWorkoutsMiddleware,
  getWorkoutByTitleMiddleware,
} = require('./workoutMiddleware');

const {
  authRole,
  authenticateToken,
  setCoachId,
  paginatedResults,
} = require('../globalMiddleware');
const { ROLE, TABLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.get(
  '/workout',
  authenticateToken,
  authRole(ROLE.COACH),
  setCoachId,
  paginatedResults(TABLE.WORKOUT),
  getAllWorkoutsMiddleware,
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.get(
  '/workout/:title',
  authenticateToken,
  authRole(ROLE.COACH),
  setCoachId,
  paginatedResults(TABLE.EXERCISE),
  getWorkoutByTitleMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

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
