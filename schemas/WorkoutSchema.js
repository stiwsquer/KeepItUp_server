const { EntitySchema } = require('typeorm');
const { Workout } = require('../models/Workout');

module.exports = new EntitySchema({
  name: 'Workout',
  target: Workout,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    title: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
  },
  relations: {
    coach: {
      type: 'many-to-one',
      target: 'Coach',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    exercises: {
      type: 'many-to-many',
      target: 'Exercise',
      joinTable: {
        name: 'exercise_workout',
      },
    },
  },
});
