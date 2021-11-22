const { getConnection } = require('typeorm');
const { Message } = require('../models/Message');

async function saveMessageDAO(message) {
  const connection = getConnection();
  const messageRepository = connection.getRepository(Message);
  return messageRepository.save(message);
}

function getMessagesDAO(conversation, client, coach) {
  const connection = getConnection();
  const messageRepository = connection.getRepository(Message);
  return messageRepository.find({
    where: [
      {
        conversation,
        client,
      },
      {
        conversation,
        coach,
      },
    ],
    relations: ['coach', 'client', 'conversation'],
  });
}

module.exports = {
  saveMessageDAO,
  getMessagesDAO,
};
