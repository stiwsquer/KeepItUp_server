const { saveCalendarMiddleware } = require('./calendarMiddleware');

const { authRole, authenticateToken } = require('../globalMiddleware');
const { ROLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.post(
  '/calendar',
  authenticateToken,
  authRole(ROLE.COACH),
  saveCalendarMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);
