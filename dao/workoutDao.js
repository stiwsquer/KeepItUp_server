const { Like } = require('typeorm');
const { getConnection } = require('typeorm');
const { Workout } = require('../models/Workout');

function getAllWorkoutsDAO(coachId, startIndex, limit) {
  const connection = getConnection();
  const workoutRepository = connection.getRepository(Workout);
  return workoutRepository.find({
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
    relations: ['coach', 'exercises'],
  });
}

function getWorkoutsByTitleDAO(workoutTitle, coachId, startIndex, limit) {
  const connection = getConnection();
  const workoutRepository = connection.getRepository(Workout);
  return workoutRepository.find({
    where: [
      {
        title: Like(`%${workoutTitle}%`),
        coach: coachId,
      },
      {
        title: Like(`%${workoutTitle}%`),
        coach: null,
      },
    ],
    skip: startIndex,
    take: limit,
    relations: ['coach', 'exercises'],
  });
}

function getWorkoutByIdDAO(id) {
  const connection = getConnection();
  const workoutRepository = connection.getRepository(Workout);
  return workoutRepository.find({
    where: [
      {
        id,
      },
    ],
    relations: ['coach', 'exercises'],
  });
}

function saveWorkoutDAO(workout) {
  const connection = getConnection();
  const workoutRepository = connection.getRepository(Workout);
  return workoutRepository.save(workout);
}

function deleteWorkoutByIdDAO(id, coachId) {
  const connection = getConnection();
  const workoutRepository = connection.getRepository(Workout);
  return workoutRepository.delete({
    id,
    coach: coachId,
  });
}

module.exports = {
  saveWorkoutDAO,
  getAllWorkoutsDAO,
  getWorkoutsByTitleDAO,
  getWorkoutByIdDAO,
  deleteWorkoutByIdDAO,
};
