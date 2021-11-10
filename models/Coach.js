const jwt = require('jsonwebtoken');

class Coach {
  constructor(id, email, password, firstName, lastName, role) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
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
