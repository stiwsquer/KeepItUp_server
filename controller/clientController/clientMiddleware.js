const {
  getClientsByEmail,
  getAllClients,
  updateCoachOfClient,
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
    res.paginatedResults.results = await updateCoachOfClient(
      req.coachId,
      email,
      req.query.deleteCoach,
    );
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

module.exports = {
  getClientsByEmailMiddleware,
  getAllClientsMiddleware,
  updateCoachOfClientMiddleware,
};
