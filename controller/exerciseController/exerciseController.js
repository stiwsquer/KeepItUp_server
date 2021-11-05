const {
  // getAllDefaultExercisesMiddleware,
  getAllExercisesMiddleware,
  getAllExercisesByNameMiddleware,
  saveExerciseMiddleware,
} = require('./exerciseMiddleware');
const {
  authRole,
  authenticateToken,
  setCoachId,
  paginatedResults,
} = require('../globalMiddleware');
const { ROLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.get(
  '/exercise',
  authenticateToken,
  setCoachId,
  paginatedResults('exercise'),
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
  paginatedResults('exercise'),
  getAllExercisesByNameMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.post(
  '/exercise',
  authenticateToken,
  authRole(ROLE.COACH),
  saveExerciseMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);
