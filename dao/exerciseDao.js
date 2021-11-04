const { Like } = require('typeorm');
const { getConnection } = require('typeorm');
const { Exercise } = require('../models/Exercise');

function getAllExercisesDAO() {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.find();
}

function saveExerciseDAO(exercise) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.save(exercise);
}

function getExercisesByNameDAO(exerciseName) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.find({
    name: Like(`%${exerciseName}%`),
  });
}

module.exports = {
  getAllExercisesDAO,
  saveExerciseDAO,
  getExercisesByNameDAO,
};
