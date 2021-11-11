const bcrypt = require('bcrypt');
const {
  getAllClientsDAO,
  getClientsByEmailDAO,
  getClientByEmailDAO,
  saveClientDAO,
  getClientsByLastNameDAO,
  // eslint-disable-next-line import/no-unresolved
} = require('../dao/clientDao');
const { Client } = require('../models/Client');
const { getCoachById } = require('./coachService');

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

//coach field of Client object is undefined when reading client from db  ?!?!?!?!?!?!
async function updateCoachOfClient(coachId, clientEmail, deleteCoach) {
  try {
    const coach = await getCoachById(coachId);
    const clientToUpdate = await getClientByEmailDAO(clientEmail);
    // console.log('client to update');
    // console.log(clientToUpdate);
    // if (clientToUpdate.coach !== null) {
    //   if (clientToUpdate.coach.id !== coachId) return null;
    // }

    clientToUpdate.coach = deleteCoach ? null : coach;
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
