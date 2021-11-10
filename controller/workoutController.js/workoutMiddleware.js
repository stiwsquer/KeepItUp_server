const { saveWorkout } = require('../../service/workoutService');

async function saveWorkoutMiddleware(req, res, next) {
  try {
    req.body.coachId = req.user.id;
    console.log(req.body);
    req.response = await saveWorkout(req.body);
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}

module.exports = {
  saveWorkoutMiddleware,
};
