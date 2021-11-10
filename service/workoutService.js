const { saveWorkoutDAO } = require('../dao/workoutDao');
const { Workout } = require('../models/Workout');
const { getExerciseById } = require('./exerciseService');

async function saveWorkout(data) {
  try {
    const promises = data.exercises.map((e) => getExerciseById(e.id));
    const exercises = await Promise.all(promises);
    const workoutData = {
      title: data.title,
      description: data.description,
      coach: data.coachId,
      exercises,
    };
    const newWorkout = new Workout(workoutData);
    return await saveWorkoutDAO(newWorkout);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { saveWorkout };
