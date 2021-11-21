const {
  saveConversationMiddleware,
  getAllUsersConversationsMiddleware,
} = require('./conversationMiddleware');
const {
  authRole,
  authenticateToken,
  paginatedResults,
} = require('../globalMiddleware');
const { ROLE, TABLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.post(
  '/conversation',
  authenticateToken,
  authRole([ROLE.COACH]),
  saveConversationMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);

app.get(
  '/conversation',
  authenticateToken,
  authRole([ROLE.COACH, ROLE.CLIENT]),
  paginatedResults(TABLE.CONVERSATION),
  getAllUsersConversationsMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);
