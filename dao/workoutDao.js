const { getConnection } = require('typeorm');
const { Workout } = require('../models/Workout');

function saveWorkoutDAO(workout) {
  const connection = getConnection();
  const workoutRepository = connection.getRepository(Workout);
  return workoutRepository.save(workout);
}

module.exports = {
  saveWorkoutDAO,
};
