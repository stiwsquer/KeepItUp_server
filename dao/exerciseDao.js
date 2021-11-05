const { Like } = require('typeorm');
const { getConnection } = require('typeorm');
const { Exercise } = require('../models/Exercise');

function getAllExercisesDAO(coachId) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.find({
    where: [
      {
        coach: coachId,
      },
      {
        coach: null,
      },
    ],
  });
}

function getAllDefaultExercisesDAO() {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.find({
    where: {
      coach: null,
    },
  });
}

function saveExerciseDAO(exercise) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.save(exercise);
}

function getExercisesByNameDAO(exerciseName, coachId) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.find({
    where: [
      {
        name: Like(`%${exerciseName}%`),
        coach: coachId,
      },
      {
        name: Like(`%${exerciseName}%`),
        coach: null,
      },
    ],
  });
}

module.exports = {
  getAllExercisesDAO,
  saveExerciseDAO,
  getExercisesByNameDAO,
  getAllDefaultExercisesDAO,
};
