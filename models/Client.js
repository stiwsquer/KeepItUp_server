const jwt = require('jsonwebtoken');

class Client {
  constructor(id, email, password, firstName, lastName, role, coach) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.coach = coach;
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
