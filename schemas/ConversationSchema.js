const { EntitySchema } = require('typeorm');
const { Conversation } = require('../models/Conversation');

module.exports = new EntitySchema({
  name: 'Conversation',
  target: Conversation,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
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
  },
});
