const {
  getAllExercisesDAO,
  saveExerciseDAO,
  getExercisesByNameDAO,
} = require('../dao/exerciseDao');
const { Exercise } = require('../models/Exercise');

async function getAllExercises() {
  try {
    return await getAllExercisesDAO();
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

async function getExercisesByName(exerciseName) {
  try {
    return await getExercisesByNameDAO(exerciseName);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getAllExercises,
  saveExercise,
  getExercisesByName,
};
