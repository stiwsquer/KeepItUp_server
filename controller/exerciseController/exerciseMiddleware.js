const {
  getAllExercises,
  saveExercise,
  getExercisesByName,
  getAllDefaultExercises,
} = require('../../service/exerciseService');

async function getAllExercisesMiddleware(req, res, next) {
  try {
    req.exercises = await getAllExercises(req.coachId);
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function getAllDefaultExercisesMiddleware(req, res, next) {
  try {
    req.exercises = await getAllDefaultExercises();
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}
async function getAllExercisesByNameMiddleware(req, res, next) {
  try {
    const { name } = req.params;
    req.exercises = await getExercisesByName(name, req.coachId);
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

module.exports = {
  getAllDefaultExercisesMiddleware,
  getAllExercisesByNameMiddleware,
  saveExerciseMiddleware,
  getAllExercisesMiddleware,
};
