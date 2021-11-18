const {
  // getAllDefaultExercisesMiddleware,
  getAllExercisesMiddleware,
  getAllExercisesByNameMiddleware,
  saveExerciseMiddleware,
  deleteExerciseByIdMiddleware,
} = require('./exerciseMiddleware');
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
  '/exercise',
  authenticateToken,
  setCoachId,
  paginatedResults(TABLE.EXERCISE),
  getAllExercisesMiddleware,
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.get(
  '/exercise/:name',
  authenticateToken,
  setCoachId,
  paginatedResults(TABLE.EXERCISE),
  getAllExercisesByNameMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.post(
  '/exercise',
  authenticateToken,
  authRole([ROLE.COACH]),
  saveExerciseMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);

app.delete(
  '/exercise/:id',
  authenticateToken,
  authRole([ROLE.COACH]),
  authCoach(TABLE.EXERCISE),
  deleteExerciseByIdMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);
