const { EntitySchema } = require('typeorm');
const { Client } = require('../models/Client');

module.exports = new EntitySchema({
  name: 'Client',
  target: Client,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'text',
    },
    firstName: {
      type: 'varchar',
    },
    lastName: {
      type: 'varchar',
    },
    role: {
      type: 'varchar',
    },
  },
  relations: {
    coach: {
      type: 'many-to-one',
      target: 'Coach',
      joinColumn: true,
      nullable: true,
    },
  },
});
