require('dotenv').config();
const { connect } = require('./database/connect');
const { app } = require('./loaders/loaders');

const PORT = 3001;

app.listen(PORT, async () => {
  console.log(`Listening at localhost:${PORT}`);
  let retries = 5;
  while (retries) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await connect();
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: + ${retries}`);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
});

require('./controller/authController');
require('./controller/exerciseController/exerciseController');
require('./controller/workoutController.js/workoutController');
require('./controller/clientController/clientController');
require('./controller/calendarController/calendarController');
require('./controller/conversationController/conversationController');
require('./controller/messageController/messageController');
