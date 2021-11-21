const {
  saveConversation,
  getAllUsersConversations,
} = require('../../service/conversationService');

async function saveConversationMiddleware(req, res, next) {
  try {
    req.body.coach = req.user.id;
    req.response = await saveConversation(req.body);
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}

async function getAllUsersConversationsMiddleware(req, res, next) {
  try {
    res.paginatedResults.results = await getAllUsersConversations(req.user);
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}
module.exports = {
  saveConversationMiddleware,
  getAllUsersConversationsMiddleware,
};
