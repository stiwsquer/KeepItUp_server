const { ROLE } = require('../controller/roles');
const {
  saveConversationDAO,
  getAllCoachesConversationsDAO,
  getClientConversationDAO,
  deleteConversationByClientIdDAO,
} = require('../dao/ConversationDao');
const { Conversation } = require('../models/Conversation');

async function saveConversation(data) {
  try {
    const newConversation = new Conversation(data);
    return await saveConversationDAO(newConversation);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getAllUsersConversations(user) {
  try {
    if (user.role === ROLE.CLIENT)
      return await getClientConversationDAO(user.id);
    if (user.role === ROLE.COACH)
      return await getAllCoachesConversationsDAO(user.id);

    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteConversationByClientId(id) {
  try {
    return await deleteConversationByClientIdDAO(id);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  saveConversation,
  getAllUsersConversations,
  deleteConversationByClientId,
};
