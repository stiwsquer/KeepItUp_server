const { getConnection, MoreThan } = require('typeorm');
const { Calendar } = require('../models/Calendar');

function saveCalendarDAO(calendar) {
  const connection = getConnection();
  const calendarRepository = connection.getRepository(Calendar);
  return calendarRepository.save(calendar);
}

function getCalendarByClientDAO(client, coach, startIndex, limit) {
  const connection = getConnection();
  const calendarRepository = connection.getRepository(Calendar);
  return calendarRepository.find({
    where: [
      {
        coach,
        client,
        date: MoreThan(new Date()),
      },
    ],
    order: {
      date: 'ASC',
    },
    skip: startIndex,
    take: limit,
    relations: ['coach', 'workout', 'client'],
  });
}

function getCalendarByIdDAO(id) {
  const connection = getConnection();
  const calendarRepository = connection.getRepository(Calendar);
  return calendarRepository.find({
    where: [
      {
        id,
      },
    ],
    relations: ['coach', 'workout', 'client'],
  });
}

function deleteCalendarByIdDAO(id) {
  const connection = getConnection();
  const calendarRepository = connection.getRepository(Calendar);
  return calendarRepository.delete(id);
}

module.exports = {
  saveCalendarDAO,
  getCalendarByClientDAO,
  deleteCalendarByIdDAO,
  getCalendarByIdDAO,
};
