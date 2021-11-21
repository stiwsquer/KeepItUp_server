/* eslint-disable global-require */

const { createConnection } = require('typeorm');

async function connect() {
  try {
    return await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'keepitup',
      synchronize: 'true',
      logging: false,
      entities: [
        require('../schemas/CalendarSchema'),
        require('../schemas/ClientSchema'),
        require('../schemas/CoachSchema'),
        require('../schemas/ExerciseSchema'),
        require('../schemas/WorkoutSchema'),
        require('../schemas/ConversationSchema'),
        require('../schemas/MessageSchema'),
      ],
    });
  } catch (err) {
    return console.error(err);
  }
}

module.exports = {
  connect,
};
