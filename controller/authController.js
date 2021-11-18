const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getCoachByEmail, saveCoach } = require('../service/coachService');
const { getClientByEmail, saveClient } = require('../service/clientService');

const { authenticateToken, authRole } = require('./globalMiddleware');
const { app } = require('../loaders/loaders');
const { ROLE } = require('./roles');

app.post('/token', authenticateToken, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken == null) return res.sendStatus(401);

  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403);
      const userFromDB =
        req.user.role === ROLE.COACH
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
        .sendStatus(200);
    },
  );
});

app.post(
  '/verify',
  authenticateToken,
  authRole([ROLE.COACH, ROLE.CLIENT]),
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(req.user);
  },
);

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
      req.body.role === ROLE.COACH
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
      .json(userFromDatabase);
  } catch (e) {
    return res.sendStatus(500);
  }
});

app.post('/register', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.body.role === 'coach') {
      if (await getCoachByEmail(req.body.email)) {
        return res.sendStatus(403);
      }
      await saveCoach(req.body);
    }

    if (req.body.role === 'client') {
      if (await getClientByEmail(req.body.email)) {
        return res.sendStatus(403);
      }
      await saveClient(req.body);
    }
    return res.status(200).json({ message: 'User successfully created' });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});
