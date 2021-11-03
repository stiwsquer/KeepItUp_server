const jwt = require('jsonwebtoken');

class Coach {
  constructor(id, email, password, firstName, lastName) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  generateAccessToken() {
    return jwt.sign(
      { email: this.email, id: this.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' },
    );
  }

  generateRefreshToken() {
    return jwt.sign(
      { email: this.email, id: this.id },
      process.env.REFRESH_TOKEN_SECRET,
    );
  }
}

module.exports = {
  Coach,
};
