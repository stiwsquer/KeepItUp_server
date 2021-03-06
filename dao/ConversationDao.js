const { getConnection } = require('typeorm');
const { Conversation } = require('../models/Conversation');

function saveConversationDAO(conversation) {
  const connection = getConnection();
  const conversationRepository = connection.getRepository(Conversation);
  return conversationRepository.save(conversation);
}

function getAllCoachesConversationsDAO(coach) {
  const connection = getConnection();
  const conversationRepository = connection.getRepository(Conversation);
  return conversationRepository.find({
    where: [
      {
        coach,
      },
    ],
    relations: ['coach', 'client'],
  });
}

function getClientConversationDAO(client) {
  const connection = getConnection();
  const conversationRepository = connection.getRepository(Conversation);
  return conversationRepository.find({
    where: [
      {
        client,
      },
    ],
    relations: ['coach', 'client'],
  });
}

function deleteConversationByClientIdDAO(id) {
  const connection = getConnection();
  const conversationRepository = connection.getRepository(Conversation);
  return conversationRepository.delete({
    client: id,
  });
}

module.exports = {
  saveConversationDAO,
  getAllCoachesConversationsDAO,
  getClientConversationDAO,
  deleteConversationByClientIdDAO,
};
