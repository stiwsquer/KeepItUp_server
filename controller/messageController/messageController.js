const {
  saveMessageMiddleware,
  getMessagesMiddleware,
} = require('./messageMiddleware');
const {
  authRole,
  authenticateToken,
  paginatedResults,
} = require('../globalMiddleware');
const { ROLE, TABLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.post(
  '/message',
  authenticateToken,
  authRole([ROLE.COACH, ROLE.CLIENT]),
  saveMessageMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);

app.get(
  '/message/:conversationId',
  authenticateToken,
  authRole([ROLE.COACH, ROLE.CLIENT]),
  paginatedResults(TABLE.MESSAGE),
  getMessagesMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);
