const {
  getClientsByEmailMiddleware,
  getAllClientsMiddleware,
  updateCoachOfClientMiddleware,
} = require('./clientMiddleware');
const {
  authRole,
  authenticateToken,
  setCoachId,
  paginatedResults,
} = require('../globalMiddleware');
const { ROLE, TABLE } = require('../roles');
const { app } = require('../../loaders/loaders');

app.get(
  '/client',
  authenticateToken,
  authRole(ROLE.COACH),
  setCoachId,
  paginatedResults(TABLE.CLIENT),
  getAllClientsMiddleware,
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.get(
  '/client/:email',
  authenticateToken,
  authRole(ROLE.COACH),
  setCoachId,
  paginatedResults(TABLE.CLIENT),
  getClientsByEmailMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.patch(
  '/client/:email',
  authenticateToken,
  authRole(ROLE.COACH),
  setCoachId,
  paginatedResults(TABLE.CLIENT),
  updateCoachOfClientMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);
