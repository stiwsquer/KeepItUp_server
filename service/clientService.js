const bcrypt = require('bcrypt');
const {
  getAllClientsDAO,
  getClientByEmailDAO,
  saveClientDAO,
  getClientsByPartialLastNameDAO,
} = require('../dao/clientDao');
const Client = require('../models/Client').Client;

async function getAllClients() {
  try {
    return await getAllClientsDAO();
  } catch (err) {
    console.log(err);
  }
}

async function getClientByEmail(email) {
  try {
    return await getClientByEmailDAO(email);
  } catch (err) {
    console.log(err);
  }
}

async function saveClient(email, password, firstName, lastName) {
  try {
    const newClient = new Client();
    newClient.email = email;
    newClient.password = await bcrypt.hash(password, 10);
    newClient.firstName = firstName;
    newClient.lastName = lastName;
    return await saveClientDAO(newClient);
  } catch (err) {
    console.log(err);
  }
}

async function getClientsByPartialLastName(lastName) {
  try {
    return await getClientsByPartialLastNameDAO(lastName);
  } catch (err) {
    console.log(err);
  }
}

function generateAccessToken(client) {
  return client.generateAccessToken();
}

function generateRefreshToken(client) {
  return client.generateRefreshToken();
}

module.exports = {
  getAllClients,
  getClientByEmail,
  saveClient,
  getClientsByPartialLastName,
  generateAccessToken,
  generateRefreshToken,
};
