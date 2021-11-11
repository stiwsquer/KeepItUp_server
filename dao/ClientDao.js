const { Like } = require('typeorm');
const { getConnection } = require('typeorm');
const { Client } = require('../models/Client');

function getAllClientsDAO(coachId, startIndex, limit) {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  return clientRepository.find({
    where: [
      {
        coach: coachId,
      },
    ],
    order: {
      id: 'ASC',
    },
    skip: startIndex,
    take: limit,
  });
}

function saveClientDAO(client) {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  return clientRepository.save(client);
}

function getClientsByLastNameDAO(lastName) {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  return clientRepository.find({
    lastName: Like(`${lastName}%`),
  });
}

function getClientsByEmailDAO(email, coachId, startIndex, limit) {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  return clientRepository.find({
    where: [
      {
        email: Like(`%${email}%`),
        coach: coachId,
      },
    ],
    skip: startIndex,
    take: limit,
  });
}
function getClientByEmailDAO(email) {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  return clientRepository.findOne({ where: [{ email }], relations: ['coach'] });
}

module.exports = {
  getAllClientsDAO,
  saveClientDAO,
  getClientsByLastNameDAO,
  getClientsByEmailDAO,
  getClientByEmailDAO,
};
