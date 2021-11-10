const { saveWorkoutDAO } = require('../dao/workoutDao');
const { Workout } = require('../models/Workout');
// const { getExerciseById } = require('./exerciseService');

async function saveWorkout(data) {
  try {
    const newWorkout = new Workout(data);
    return await saveWorkoutDAO(newWorkout);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { saveWorkout };
