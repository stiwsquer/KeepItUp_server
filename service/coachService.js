const bcrypt = require('bcrypt');
const {
  getAllCoachesDAO,
  getCoachByEmailDAO,
  saveCoachDAO,
  getCoachesByPartialLastNameDAO,
} = require('../dao/coachDao');
const { Coach } = require('../models/Coach');

async function getAllCoaches() {
  try {
    return await getAllCoachesDAO();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getCoachByEmail(email) {
  try {
    return await getCoachByEmailDAO(email);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function saveCoach(data) {
  try {
    const newCoach = new Coach();
    newCoach.email = data.email;
    newCoach.password = await bcrypt.hash(data.password, 10);
    newCoach.firstName = data.firstName;
    newCoach.lastName = data.lastName;
    newCoach.role = data.role;
    return await saveCoachDAO(newCoach);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getCoachesByPartialLastName(lastName) {
  try {
    return await getCoachesByPartialLastNameDAO(lastName);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getAllCoaches,
  getCoachByEmail,
  saveCoach,
  getCoachesByPartialLastName,
};
