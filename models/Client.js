const jwt = require('jsonwebtoken');

class Client {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.coach = data.coach;
  }

  generateAccessToken() {
    return jwt.sign(
      { email: this.email, id: this.id, role: this.role, coach: this.coach },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' },
    );
  }

  generateRefreshToken() {
    return jwt.sign(
      { email: this.email, id: this.id, role: this.role, coach: this.coach },
      process.env.REFRESH_TOKEN_SECRET,
    );
  }
}

module.exports = {
  Client,
};
