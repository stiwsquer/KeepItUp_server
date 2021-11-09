const { EntitySchema } = require('typeorm');
const { Calendar } = require('../models/Calendar');

module.exports = new EntitySchema({
  name: 'Calendar',
  target: Calendar,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    date: {
      type: 'date',
    },
  },
  relations: {
    coach: {
      type: 'many-to-one',
      target: 'Coach',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    client: {
      type: 'many-to-one',
      target: 'Client',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    workout: {
      type: 'many-to-one',
      target: 'Workout',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
