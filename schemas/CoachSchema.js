const { EntitySchema } = require('typeorm');
const { Coach } = require('../models/Coach');

module.exports = new EntitySchema({
  name: 'Coach',
  target: Coach,
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
