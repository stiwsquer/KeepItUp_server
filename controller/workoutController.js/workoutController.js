const {
  saveWorkoutMiddleware,
  getAllWorkoutsMiddleware,
  getWorkoutByTitleMiddleware,
  getWorkoutByIdMiddleware,
  deleteWorkoutByIdMiddleware,
} = require('./workoutMiddleware');

const {
  authRole,
  authenticateToken,
  setCoachId,
  paginatedResults,
  authCoach,
} = require('../globalMiddleware');
const { ROLE, TABLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.get(
  '/workout',
  authenticateToken,
  authRole([ROLE.COACH]),
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
  authRole([ROLE.COACH]),
  setCoachId,
  paginatedResults(TABLE.WORKOUT),
  getWorkoutByTitleMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.get(
  '/workout/id/:id',
  authenticateToken,
  authRole([ROLE.COACH, ROLE.CLIENT]),
  paginatedResults(TABLE.WORKOUT),
  getWorkoutByIdMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.post(
  '/workout',
  authenticateToken,
  authRole([ROLE.COACH]),
  saveWorkoutMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);

app.delete(
  '/workout/:id',
  authenticateToken,
  authRole([ROLE.COACH]),
  authCoach(TABLE.WORKOUT),
  deleteWorkoutByIdMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);
