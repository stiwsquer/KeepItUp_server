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
const {
  saveConversation,
  deleteConversationByClientId,
  getAllUsersConversations,
} = require('./conversationService');

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

async function updateCoachOfClient(coachId, clientEmail, deleteCoach) {
  try {
    const coach = await getCoachById(coachId);
    const clientToUpdate = await getClientByEmailDAO(clientEmail);
    if (clientToUpdate.coach !== null) {
      if (clientToUpdate.coach.id !== coachId) return null;
    }
    clientToUpdate.coach = deleteCoach ? null : coach;

    // Creating conversation
    if (clientToUpdate.coach) {
      if (!(await getAllUsersConversations(clientToUpdate)))
        await saveConversation({
          client: clientToUpdate.id,
          coach: coach.id,
        });
    }
    // Removing conversation
    else {
      await deleteConversationByClientId(clientToUpdate.id);
    }

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
