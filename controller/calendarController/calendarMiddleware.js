const {
  saveCalendar,
  getCalendarByClient,
  deleteCalendarById,
  getCalendarById,
} = require('../../service/calendarService');
const { ROLE } = require('../roles');

async function saveCalendarMiddleware(req, res, next) {
  try {
    req.body.coach = req.user.id;
    req.response = await saveCalendar(req.body);
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}

async function getCalendarByClientMiddleware(req, res, next) {
  try {
    const { client } = req.params;
    res.paginatedResults.results = await getCalendarByClient(
      client,
      req.coachId,
      req.startIndex,
      req.limit,
    );
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

async function deleteCalendarByIdMiddleware(req, res, next) {
  try {
    const { id } = req.params;
    res.response = await deleteCalendarById(id);
  } catch (err) {
    return res.sendStatus(404);
  }
  return next();
}

function checkDate(req, res, next) {
  const date = new Date(req.body.date);
  const now = new Date();
  if (date.getTime() < now.getTime()) {
    return res.sendStatus(403);
  }
  return next();
}

async function checkPermissions(req, res, next) {
  const calendarToDelete = await getCalendarById(req.params.id);
  const { role } = req.user;
  if (role === ROLE.CLIENT && calendarToDelete[0].client.id !== req.user.id)
    return res.sendStatus(403);
  if (role === ROLE.COACH && calendarToDelete[0].coach.id !== req.user.id)
    return res.sendStatus(403);

  return next();
}

module.exports = {
  saveCalendarMiddleware,
  checkDate,
  getCalendarByClientMiddleware,
  deleteCalendarByIdMiddleware,
  checkPermissions,
};
