const bcrypt = require('bcrypt');
const {
  getAllCoachesDAO,
  getCoachByEmailDAO,
  saveCoachDAO,
  getCoachesByPartialLastNameDAO,
} = require('../dao/coachDao');
const Coach = require('../models/Coach').Coach;

async function getAllCoaches() {
  try {
    return await getAllCoachesDAO();
  } catch (err) {
    console.log(err);
  }
}

async function getCoachByEmail(email) {
  try {
    return await getCoachByEmailDAO(email);
  } catch (err) {
    console.log(err);
  }
}

async function saveCoach(email, password, firstName, lastName) {
  try {
    const newCoach = new Coach();
    newCoach.email = email;
    newCoach.password = await bcrypt.hash(password, 10);
    newCoach.firstName = firstName;
    newCoach.lastName = lastName;
    return await saveCoachDAO(newCoach);
  } catch (err) {
    console.log(err);
  }
}

async function getCoachesByPartialLastName(lastName) {
  try {
    return await getCoachesByPartialLastNameDAO(lastName);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllCoaches,
  getCoachByEmail,
  saveCoach,
  getCoachesByPartialLastName,
};
