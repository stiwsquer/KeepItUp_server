const {
  getClientsByEmail,
  getAllClients,
  updateCoachOfClient,
  getClientByEmail,
} = require('../../service/clientService');

async function getAllClientsMiddleware(req, res, next) {
  try {
    res.paginatedResults.results = await getAllClients(
      req.coachId,
      req.startIndex,
      req.limit,
    );
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function getClientsByEmailMiddleware(req, res, next) {
  try {
    const { email } = req.params;
    res.paginatedResults.results = await getClientsByEmail(
      email,
      req.coachId,
      req.startIndex,
      req.limit,
    );
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function updateCoachOfClientMiddleware(req, res, next) {
  try {
    const { email } = req.params;
    const response = await updateCoachOfClient(
      req.coachId,
      email,
      req.query.deleteCoach,
    );
    if (response === null) return res.sendStatus(403);
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function checkIfClientExists(req, res, next) {
  try {
    const { email } = req.params;
    const client = await getClientByEmail(email);
    if (client) return next();
    return res.sendStatus(404);
  } catch (e) {
    return res.sendStatus(404);
  }
}

module.exports = {
  getClientsByEmailMiddleware,
  getAllClientsMiddleware,
  updateCoachOfClientMiddleware,
  checkIfClientExists,
};
