const {
  getAllExercises,
  saveExercise,
  getExercisesByName,
  getAllDefaultExercises,
} = require('../../service/exerciseService');

async function getAllExercisesMiddleware(req, res, next) {
  try {
    res.paginatedResults.results = await getAllExercises(
      req.coachId,
      req.startIndex,
      req.limit,
    );
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function getAllDefaultExercisesMiddleware(req, res, next) {
  try {
    res.paginatedResults.results = await getAllDefaultExercises(
      req.startIndex,
      req.limit,
    );
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}
async function getAllExercisesByNameMiddleware(req, res, next) {
  try {
    const { name } = req.params;
    res.paginatedResults.results = await getExercisesByName(
      name,
      req.coach,
      req.startIndex,
      req.limit,
    );
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
