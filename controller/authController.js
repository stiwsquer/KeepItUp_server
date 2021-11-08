const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  // getAllCoaches,
  getCoachByEmail,
  saveCoach,
  // getCoachesByPartialLastName,
  // generateAccessToken,
  // generateRefreshToken,
} = require('../service/coachService');
const {
  getAllClients,
  getClientByEmail,
  saveClient,
  // getClientsByPartialLastName,
} = require('../service/clientService');

const { authenticateToken } = require('./globalMiddleware');
const { app } = require('../loaders/loaders');

app.get('/client', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const clients = await getAllClients();
  res.send(clients);
});

app.post('/token', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken == null) return res.sendStatus(401);

  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403);
      const userFromDB =
        req.body.userType === 'coach'
          ? await getCoachByEmail(user.email)
          : await getClientByEmail(user.email);

      const accessToken =
        userFromDB == null ? null : userFromDB.generateAccessToken();

      if (accessToken == null) {
        return res.sendStatus(403);
      }
      return res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ message: 'Successfully refreshed access token' });
    },
  );
});

app.post('/verify', authenticateToken, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ message: 'Access token is correct' });
});

app.delete('/logout', authenticateToken, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res
    .clearCookie('access_token')
    .clearCookie('refresh_token')
    .status(200)
    .json({ message: 'Successfully logged out' });
});

app.post('/login', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // Authentication - checking if user exists
  try {
    const userFromDatabase =
      req.body.userType === 'coach'
        ? await getCoachByEmail(req.body.email)
        : await getClientByEmail(req.body.email);

    if (userFromDatabase == null) {
      return res.sendStatus(403);
    }
    if (!(await bcrypt.compare(req.body.password, userFromDatabase.password))) {
      return res.sendStatus(403);
    }

    // Authorization - creating tokens and sending them to the client
    const accessToken = userFromDatabase.generateAccessToken();
    const refreshToken = userFromDatabase.generateRefreshToken();
    return res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json({ message: 'Logged in successfully' });
  } catch (e) {
    return res.sendStatus(500);
  }
});

app.post('/register', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.body.userType === 'coach') {
      if (await getCoachByEmail(req.body.email)) {
        return res
          .status(403)
          .send(`User with email: ${req.body.email} already exists`);
      }
      await saveCoach(req.body);
    }

    if (req.body.userType === 'client') {
      if (await getClientByEmail(req.body.email)) {
        return res
          .status(403)
          .send(`User with email: ${req.body.email} already exists`);
      }
      await saveClient(req.body);
    }

    return res.status(200).json({ message: 'User successfully created' });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});
