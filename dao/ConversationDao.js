const { getConnection } = require('typeorm');
const { Conversation } = require('../models/Conversation');

function saveConversationDAO(conversation) {
  const connection = getConnection();
  const conversationRepository = connection.getRepository(Conversation);
  return conversationRepository.save(conversation);
}

module.exports = {
  saveConversationDAO,
};
