const {
  getClientsByEmailMiddleware,
  getAllClientsMiddleware,
  updateCoachOfClientMiddleware,
  checkIfClientExists,
} = require('./clientMiddleware');
const {
  authRole,
  authenticateToken,
  setCoachId,
  paginatedResults,
  filterOutPassword,
} = require('../globalMiddleware');
const { ROLE, TABLE } = require('../roles');
const { app } = require('../../loaders/loaders');

app.get(
  '/client',
  authenticateToken,
  authRole([ROLE.COACH]),
  setCoachId,
  paginatedResults(TABLE.CLIENT),
  getAllClientsMiddleware,
  filterOutPassword,
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.get(
  '/client/:email',
  authenticateToken,
  authRole([ROLE.COACH]),
  setCoachId,
  paginatedResults(TABLE.CLIENT),
  getClientsByEmailMiddleware,
  filterOutPassword,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.patch(
  '/client/:email',
  authenticateToken,
  authRole([ROLE.COACH]),
  checkIfClientExists,
  setCoachId,
  paginatedResults(TABLE.CLIENT),
  updateCoachOfClientMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.sendStatus(200);
  },
);
