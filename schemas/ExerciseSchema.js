const EntitySchema = require('typeorm').EntitySchema;
const Exercise = require('../models/Exercise').Exercise;

module.exports = new EntitySchema({
  name: 'Exercise',
  target: Exercise,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    bodyPart: {
      type: 'varchar',
    },
    equipment: {
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    target: {
      type: 'varchar',
    },
    url: {
      type: 'varchar',
      nullable: true,
    },
  },
  relations: {
    coach: {
      type: 'many-to-one',
      target: 'Coach',
      joinColumn: true,
      onDelete: 'CASCADE',
      nullable: true,
    },
  },
});
