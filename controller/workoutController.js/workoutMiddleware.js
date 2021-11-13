const {
  saveWorkout,
  getAllWorkouts,
  getWorkoutByTitle,
  getWorkoutById,
} = require('../../service/workoutService');

async function getAllWorkoutsMiddleware(req, res, next) {
  try {
    res.paginatedResults.results = await getAllWorkouts(
      req.coachId,
      req.startIndex,
      req.limit,
    );
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function getWorkoutByTitleMiddleware(req, res, next) {
  try {
    const { title } = req.params;
    res.paginatedResults.results = await getWorkoutByTitle(
      title,
      req.coachId,
      req.startIndex,
      req.limit,
    );
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function getWorkoutByIdMiddleware(req, res, next) {
  try {
    const { id } = req.params;
    res.paginatedResults.results = await getWorkoutById(id);
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function saveWorkoutMiddleware(req, res, next) {
  try {
    req.body.coach = req.user.id;
    req.response = await saveWorkout(req.body);
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}

module.exports = {
  saveWorkoutMiddleware,
  getAllWorkoutsMiddleware,
  getWorkoutByTitleMiddleware,
  getWorkoutByIdMiddleware,
};
