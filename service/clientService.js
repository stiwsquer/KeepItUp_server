const bcrypt = require('bcrypt');
const {
  getAllClientsDAO,
  getClientByEmailDAO,
  saveClientDAO,
  getClientsByPartialLastNameDAO,
} = require('../dao/clientDao');
const { Client } = require('../models/Client');

async function getAllClients() {
  try {
    return await getAllClientsDAO();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getClientByEmail(email) {
  try {
    return await getClientByEmailDAO(email);
  } catch (err) {
    console.log(err);

    return null;
  }
}

async function saveClient(data) {
  try {
    const newClient = new Client();
    newClient.email = data.email;
    newClient.password = await bcrypt.hash(data.password, 10);
    newClient.firstName = data.firstName;
    newClient.lastName = data.lastName;
    newClient.role = data.role;
    return await saveClientDAO(newClient);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getClientsByPartialLastName(lastName) {
  try {
    return await getClientsByPartialLastNameDAO(lastName);
  } catch (err) {
    console.log(err);
    return null;
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
