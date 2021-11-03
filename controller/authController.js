const bcrypt = require('bcrypt');
// const {
//   getAllUsers,
//   getUserByEmail,
//   getUserById,
//   saveUser,
//   updateUser,
//   removeUser,
//   removeUserById,
//   removeUserByEmail,
//   generateRefreshToken,
//   generateAccessToken,
//   verifyPassword,
//   getUserByPlainObject,
// } = require("../service/userService");
const jwt = require('jsonwebtoken');
const { app, authenticateToken } = require('../loaders/loaders');

app.post('/token', async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const userFromDB =
      req.body.type === 'coach'
        ? getCoachByEmail(user.email)
        : getClientByEmail(user.email);

    const accessToken =
      userFromDB == null ? null : generateAccessToken(userFromDB);

    if (accessToken == null) {
      res.sendStatus(403);
    }
    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json({ message: 'Successfully refreshed access token' });
  });
});

app.post('/verify', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Access token is correct' });
});

app.delete('/logout', authenticateToken, (req, res) => {
  return res
    .clearCookie('access_token')
    .clearCookie('refresh_token')
    .status(200)
    .json({ message: 'Successfully logged out' });
});

app.post('/login', async (req, res) => {
  // Authentication - checking if user exists
  try {
    const userFromDatabase =
      req.body.type === 'coach'
        ? await getCoachByEmail(req.body.email)
        : await getClientByEmail(req.body.email);

    if (userFromDatabase == null) {
      return res.status(400).send('Cannot find user');
    }
    if (!(await bcrypt.compare(req.body.password, userFromDatabase.password))) {
      return res.send('Not Allowed');
    }

    // Authorization - creating tokens and sending them to the client
    const accessToken = generateAccessToken(userFromDatabase);
    const refreshToken = generateRefreshToken(userFromDatabase);
    res
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
    res.status(500).send();
  }
});

app.post('/register', async (req, res) => {
  try {
    const errorRes = res
      .status(403)
      .send(`User with email: ${req.body.email} already exists`);

    if (req.body.type === 'coach') {
      if ((await getByCoachByEmail(req.body.email)) ? true : false) {
        return errorRes;
      }
      await saveCoach(
        req.body.email,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
      );
    }

    if (req.body.type === 'client') {
      if ((await getByClientByEmail(req.body.email)) ? true : false) {
        return errorRes;
      }
      await saveClient(
        req.body.email,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
      );
    }
    res.status(200).json({ message: 'User successfully created' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
