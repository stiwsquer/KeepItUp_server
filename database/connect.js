const typeorm = require('typeorm');

async function connect() {
  try {
    return await typeorm.createConnection({
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
      ],
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  connect,
};
