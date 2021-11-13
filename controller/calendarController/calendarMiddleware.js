const { saveCalendar } = require('../../service/calendarService');

async function saveCalendarMiddleware(req, res, next) {
  try {
    req.body.coach = req.user.id;
    req.response = await saveCalendar(req.body);
  } catch (err) {
    return res.sendStatus(500);
  }
  return next();
}

module.exports = { saveCalendarMiddleware };
