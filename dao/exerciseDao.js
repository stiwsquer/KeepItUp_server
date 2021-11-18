const { Like } = require('typeorm');
const { getConnection } = require('typeorm');
const { Exercise } = require('../models/Exercise');

function getAllExercisesDAO(coachId, startIndex, limit) {
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
    order: {
      id: 'ASC',
    },
    skip: startIndex,
    take: limit,
    relations: ['coach'],
  });
}

function countExercisesDAO() {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.count();
}

function getAllDefaultExercisesDAO(startIndex, limit) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.find({
    where: {
      coach: null,
    },
    order: {
      id: 'ASC',
    },
    skip: startIndex,
    take: limit,
    relations: ['coach'],
  });
}

function saveExerciseDAO(exercise) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.save(exercise);
}

function getExercisesByNameDAO(exerciseName, coachId, startIndex, limit) {
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
    skip: startIndex,
    take: limit,
    relations: ['coach'],
  });
}

function deleteExerciseByIdDAO(id, coachId) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.delete({
    id,
    coach: coachId,
  });
}

function getExercisesByIdDAO(id) {
  const connection = getConnection();
  const exerciseRepository = connection.getRepository(Exercise);
  return exerciseRepository.findOne(id, { relations: ['coach'] });
}
module.exports = {
  getAllExercisesDAO,
  saveExerciseDAO,
  getExercisesByNameDAO,
  getAllDefaultExercisesDAO,
  countExercisesDAO,
  getExercisesByIdDAO,
  deleteExerciseByIdDAO,
};
