const { saveMessage, getMessages } = require('../../service/messageService');
const { ROLE } = require('../roles');

async function saveMessageMiddleware(req, res, next) {
  try {
    if (req.user.role === ROLE.CLIENT) {
      req.body.client = req.user.id;
      req.body.owner = 'client';
    }
    if (req.user.role === ROLE.COACH) {
      req.body.coach = req.user.id;
      req.body.owner = 'coach';
    }
    req.response = await saveMessage(req.body);
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}

async function getMessagesMiddleware(req, res, next) {
  try {
    let clientId;
    let coachId;
    if (req.user.role === ROLE.COACH) {
      coachId = req.user.id;
      clientId = null;
    }
    if (req.user.role === ROLE.CLIENT) {
      clientId = req.user.id;
      coachId = null;
    }
    const response = await getMessages(
      req.params.conversationId,
      clientId,
      coachId,
    );

    res.paginatedResults.results = response;
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}

module.exports = {
  saveMessageMiddleware,
  getMessagesMiddleware,
};
