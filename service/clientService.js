const bcrypt = require('bcrypt');
const {
  getAllClientsDAO,
  getClientsByEmailDAO,
  getClientByEmailDAO,
  saveClientDAO,
  getClientsByLastNameDAO,
} = require('../dao/clientDao');
const { Client } = require('../models/Client');

async function getAllClients(coachId, startIndex, limit) {
  try {
    return await getAllClientsDAO(coachId, startIndex, limit);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getClientsByEmail(email, coachId, startIndex, limit) {
  try {
    return await getClientsByEmailDAO(email, coachId, startIndex, limit);
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
    const newClient = new Client(data);
    newClient.password = await bcrypt.hash(data.password, 10);
    return await saveClientDAO(newClient);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getClientsByLastName(lastName) {
  try {
    return await getClientsByLastNameDAO(lastName);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateCoachOfClient(coachId, email, deleteCoach) {
  try {
    const clientToUpdate = await getClientByEmailDAO(email);
    clientToUpdate.coach = deleteCoach ? null : coachId;
    return await saveClientDAO(clientToUpdate);
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
  getClientsByEmail,
  saveClient,
  getClientsByLastName,
  generateAccessToken,
  generateRefreshToken,
  getClientByEmail,
  updateCoachOfClient,
};
