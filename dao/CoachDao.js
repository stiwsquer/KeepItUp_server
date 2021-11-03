const Like = require('typeorm').Like;
const Coach = require('../models/Coach').Coach;
const getConnection = require('typeorm').getConnection;

function getAllCoachesDAO() {
  const connection = getConnection();
  const coachRepository = connection.getRepository(Coach);
  return coachRepository.find();
}

function getCoachByEmailDAO(email) {
  const connection = getConnection();
  const coachRepository = connection.getRepository(Coach);
  // return coachRepository.find({
  //   where: {
  //     email: `${email}`,
  //   },
  // });
  return coachRepository.findOne({ email: email });
}

function saveCoachDAO(coach) {
  const connection = getConnection();
  const coachRepository = connection.getRepository(Coach);
  return coachRepository.save(coach);
}

function getCoachesByPartialLastNameDAO(lastName) {
  const connection = getConnection();
  const coachRepository = connection.getRepository(Coach);
  return coachRepository.find({
    lastName: Like(`${lastName}%`),
  });
}

module.exports = {
  getAllCoachesDAO,
  getCoachByEmailDAO,
  saveCoachDAO,
  getCoachesByPartialLastNameDAO,
};
