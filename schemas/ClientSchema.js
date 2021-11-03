const EntitySchema = require('typeorm').EntitySchema;
const Client = require('../models/Client').Client;

module.exports = new EntitySchema({
  name: 'Client',
  target: Client,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
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
  },
});
