const {
  getAllExercisesDAO,
  saveExerciseDAO,
  getExercisesByNameDAO,
  getAllDefaultExercisesDAO,
  countExercisesDAO,
  getExercisesByIdDAO,
} = require('../dao/ExerciseDao');
const { Exercise } = require('../models/Exercise');

async function getAllExercises(coachId, startIndex, limit) {
  try {
    return await getAllExercisesDAO(coachId, startIndex, limit);
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function countExercises() {
  try {
    return await countExercisesDAO();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getAllDefaultExercises(startIndex, limit) {
  try {
    return await getAllDefaultExercisesDAO(startIndex, limit);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function saveExercise(data) {
  try {
    const newExercise = new Exercise(data);
    return await saveExerciseDAO(newExercise);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getExercisesByName(exerciseName, coachId, startIndex, limit) {
  try {
    return await getExercisesByNameDAO(
      exerciseName,
      coachId,
      startIndex,
      limit,
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getExerciseById(id) {
  try {
    return await getExercisesByIdDAO(id);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getAllExercises,
  saveExercise,
  getExercisesByName,
  getAllDefaultExercises,
  countExercises,
  getExerciseById,
};
