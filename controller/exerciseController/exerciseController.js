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
} = require('../authMiddleware');
const { ROLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.get(
  '/exercise',
  authenticateToken,
  setCoachId,
  getAllExercisesMiddleware,
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.exercises);
  },
);

app.get(
  '/exercise/name/:name',
  authenticateToken,
  setCoachId,
  getAllExercisesByNameMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(req.exercises);
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
