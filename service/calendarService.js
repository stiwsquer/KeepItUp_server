const { saveCalendarDAO } = require('../dao/CalendarDao');
const { Calendar } = require('../models/Calendar');

async function saveCalendar(data) {
  try {
    const newCalendar = new Calendar(data);
    return await saveCalendarDAO(newCalendar);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { saveCalendar };
