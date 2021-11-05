const {
  getAllExercisesDAO,
  saveExerciseDAO,
  getExercisesByNameDAO,
  getAllDefaultExercisesDAO,
} = require('../dao/exerciseDao');
const { Exercise } = require('../models/Exercise');

async function getAllExercises(coachId) {
  try {
    return await getAllExercisesDAO(coachId);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getAllDefaultExercises() {
  try {
    return await getAllDefaultExercisesDAO();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function saveExercise(data) {
  try {
    const newExercise = new Exercise();
    newExercise.coachId = data.coachId;
    newExercise.bodyPart = data.bodyPart;
    newExercise.equipment = data.equipment;
    newExercise.name = data.name;
    newExercise.target = data.target;
    newExercise.url = data.url;
    return await saveExerciseDAO(newExercise);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getExercisesByName(exerciseName, coachId) {
  try {
    return await getExercisesByNameDAO(exerciseName, coachId);
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
};
