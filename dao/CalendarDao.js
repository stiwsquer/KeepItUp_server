const { getConnection } = require('typeorm');
const { Calendar } = require('../models/Calendar');

function saveCalendarDAO(calendar) {
  const connection = getConnection();
  const calendarRepository = connection.getRepository(Calendar);
  return calendarRepository.save(calendar);
}

module.exports = {
  saveCalendarDAO,
};
