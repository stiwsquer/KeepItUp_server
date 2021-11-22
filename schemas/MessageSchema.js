const { EntitySchema } = require('typeorm');
const { Message } = require('../models/Message');

module.exports = new EntitySchema({
  name: 'Message',
  target: Message,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    content: {
      type: 'text',
    },
    createdAt: {
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    },
    owner: {
      type: 'varchar',
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
    client: {
      type: 'many-to-one',
      target: 'Client',
      joinColumn: true,
      onDelete: 'CASCADE',
      nullable: true,
    },
    conversation: {
      type: 'many-to-one',
      target: 'Conversation',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
