const {
  saveWorkoutDAO,
  getAllWorkoutsDAO,
  getWorkoutsByTitleDAO,
} = require('../dao/WorkoutDao');
const { Workout } = require('../models/Workout');

async function getAllWorkouts(coachId, startIndex, limit) {
  try {
    return await getAllWorkoutsDAO(coachId, startIndex, limit);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getWorkoutByTitle(workoutTitle, coachId, startIndex, limit) {
  try {
    return await getWorkoutsByTitleDAO(
      workoutTitle,
      coachId,
      startIndex,
      limit,
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function saveWorkout(data) {
  try {
    const newWorkout = new Workout(data);
    return await saveWorkoutDAO(newWorkout);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { saveWorkout, getAllWorkouts, getWorkoutByTitle };
