const express = require('express');
const jwt = require('jsonwebtoken');

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

function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  if (token == null) return res.sendStatus(401);
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  });
}

module.exports = { app, authenticateToken };
