const jwt = require('jsonwebtoken');

class Coach {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
  }

  generateAccessToken() {
    return jwt.sign(
      { email: this.email, id: this.id, role: this.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' },
    );
  }

  generateRefreshToken() {
    return jwt.sign(
      { email: this.email, id: this.id, role: this.role },
      process.env.REFRESH_TOKEN_SECRET,
    );
  }
}

module.exports = {
  Coach,
};
