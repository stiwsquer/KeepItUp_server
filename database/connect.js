const typeorm = require('typeorm');

async function connect() {
  try {
    return await typeorm.createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'keepitup',
      synchronize: 'true',
      logging: false,
      entities: [],
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  connect,
};
