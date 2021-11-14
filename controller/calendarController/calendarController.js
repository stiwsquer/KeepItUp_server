const {
  saveCalendarMiddleware,
  checkDate,
  getCalendarByClientMiddleware,
  deleteCalendarByIdMiddleware,
  checkPermissions,
  getCalendarsMiddleware,
  getCalendarsByDateMiddleware,
} = require('./calendarMiddleware');
const {
  authRole,
  authenticateToken,
  setCoachId,
  paginatedResults,
} = require('../globalMiddleware');
const { ROLE, TABLE } = require('../roles');

const { app } = require('../../loaders/loaders');

app.get(
  '/calendar/client/:client',
  authenticateToken,
  setCoachId,
  paginatedResults(TABLE.CALENDAR),
  getCalendarByClientMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.get(
  '/calendar/date/:date',
  authenticateToken,
  paginatedResults(TABLE.CALENDAR),
  getCalendarsByDateMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

// For getting calendars by multiple values (object)
app.patch(
  '/calendar',
  authenticateToken,
  setCoachId,
  paginatedResults(TABLE.CALENDAR),
  getCalendarsMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.paginatedResults);
  },
);

app.post(
  '/calendar',
  authenticateToken,
  authRole([ROLE.COACH]),
  checkDate,
  saveCalendarMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.send(req.response);
  },
);

app.delete(
  '/calendar/:id',
  authenticateToken,
  authRole([ROLE.COACH, ROLE.CLIENT]),
  checkPermissions,
  deleteCalendarByIdMiddleware,
  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json(res.response);
  },
);
