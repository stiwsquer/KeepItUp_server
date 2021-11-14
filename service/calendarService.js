const {
  saveCalendarDAO,
  getCalendarByClientDAO,
  deleteCalendarByIdDAO,
  getCalendarByIdDAO,
  getCalendarsDAO,
} = require('../dao/CalendarDao');
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

async function getCalendarByClient(client, coach, startIndex, limit) {
  try {
    return await getCalendarByClientDAO(client, coach, startIndex, limit);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getCalendars(params, startIndex, limit) {
  try {
    return await getCalendarsDAO(params, startIndex, limit);
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function getCalendarById(id) {
  try {
    return await getCalendarByIdDAO(id);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteCalendarById(id) {
  try {
    return await deleteCalendarByIdDAO(id);
  } catch (err) {
    console.log(err);
    return null;
  }
}
module.exports = {
  saveCalendar,
  getCalendarByClient,
  deleteCalendarById,
  getCalendarById,
  getCalendars,
};
