const bcrypt = require('bcrypt');
const {
  getAllCoachesDAO,
  getCoachByEmailDAO,
  saveCoachDAO,
  getCoachesByPartialLastNameDAO,
} = require('../dao/coachDao');

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
    const newCoach = new User();
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

function generateAccessToken(coach) {
  return coach.generateAccessToken();
}

function generateRefreshToken(coach) {
  return coach.generateRefreshToken();
}

module.exports = {
  getAllCoaches,
  getCoachByEmail,
  saveCoach,
  getCoachesByPartialLastName,
  generateAccessToken,
  generateRefreshToken,
};
