const jwt = require('jsonwebtoken');

class Client {
  constructor(id, email, password, firstName, lastName, type) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type;
  }

  generateAccessToken() {
    return jwt.sign(
      { email: this.email, id: this.id, type: this.type },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' },
    );
  }

  generateRefreshToken() {
    return jwt.sign(
      { email: this.email, id: this.id, type: this.type },
      process.env.REFRESH_TOKEN_SECRET,
    );
  }
}

module.exports = {
  Client,
};
