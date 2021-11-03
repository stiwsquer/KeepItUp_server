require('dotenv').config();
const { connect } = require('../database/connect');
const { app } = require('../loaders/loaders');

const PORT = 3001;
let connection;

app.listen(PORT, async () => {
  console.log(`Listening at localhost:${PORT}`);
  connection = await connect();
});
