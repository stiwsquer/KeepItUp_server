const { EntitySchema } = require('typeorm');
const { Exercise } = require('../models/Exercise');

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
      type: 'text',
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
