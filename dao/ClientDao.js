const Like = require('typeorm').Like;
const Client = require('../models/Client').Client;
const getConnection = require('typeorm').getConnection;

function getAllClientsDAO() {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  return clientRepository.find();
}

function getClientByEmailDAO(email) {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  // return clientRepository.find({
  //   where: {
  //     email: `${email}`,
  //   },
  // });

  return clientRepository.findOne({ email: email });
}

function saveClientDAO(client) {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  return clientRepository.save(client);
}

function getClientsByPartialLastNameDAO(lastName) {
  const connection = getConnection();
  const clientRepository = connection.getRepository(Client);
  return clientRepository.find({
    lastName: Like(`${lastName}%`),
  });
}

module.exports = {
  getAllClientsDAO,
  getClientByEmailDAO,
  saveClientDAO,
  getClientsByPartialLastNameDAO,
};
