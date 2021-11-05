const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

module.exports = { app };
