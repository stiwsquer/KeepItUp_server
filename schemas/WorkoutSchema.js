const EntitySchema = require('typeorm').EntitySchema;
const Workout = require('../models/Workout').Workout;

module.exports = new EntitySchema({
  name: 'Workout',
  target: Workout,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
  },
  relations: {
    coach: {
      type: 'many-to-one',
      target: 'Coach',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    workouts: {
      type: 'many-to-many',
      target: 'Exercise',
      joinTable: {
        name: 'exercise_workout',
      },
    },
  },
});
