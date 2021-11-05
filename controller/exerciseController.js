const {
  getAllExercises,
  saveExercise,
  getExercisesByName,
} = require('../service/exerciseService');

const { app, authenticateToken } = require('../loaders/loaders');

async function getAllExercisesMiddleware(req, res, next) {
  try {
    req.exercises = await getAllExercises();
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function getAllExercisesByNameMiddleware(req, res, next) {
  try {
    const { name } = req.params;
    req.exercises = await getExercisesByName(name);
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function saveExerciseMiddleware(req, res, next) {
  try {
    req.body.coachId = req.user.id;
    req.response = await saveExercise(req.body);
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}

app.get(
  '/exercise',
  authenticateToken,
  getAllExercisesMiddleware,
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.exercises);
  },
);

app.get(
  '/exercise/name/:name',
  authenticateToken,
  getAllExercisesByNameMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(req.exercises);
  },
);

app.post(
  '/exercise',
  authenticateToken,
  saveExerciseMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);
