const { Like } = require('typeorm');
const { getConnection } = require('typeorm');
const { Coach } = require('../models/Coach');

function getAllCoachesDAO() {
  const connection = getConnection();
  const coachRepository = connection.getRepository(Coach);
  return coachRepository.find();
}

function getCoachByEmailDAO(email) {
  const connection = getConnection();
  const coachRepository = connection.getRepository(Coach);
  return coachRepository.findOne({ email });
}

function getCoachByIdDAO(id) {
  const connection = getConnection();
  const coachRepository = connection.getRepository(Coach);
  return coachRepository.findOne(id);
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
  getCoachByIdDAO,
};
