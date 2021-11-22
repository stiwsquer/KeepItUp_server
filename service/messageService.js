const { saveMessageDAO, getMessagesDAO } = require('../dao/MessageDao');
const { Message } = require('../models/Message');

async function saveMessage(data) {
  try {
    const newMessage = new Message(data);
    return await saveMessageDAO(newMessage);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getMessages(conversation, clientId, coachId) {
  try {
    return await getMessagesDAO(conversation, clientId, coachId);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  saveMessage,
  getMessages,
};
