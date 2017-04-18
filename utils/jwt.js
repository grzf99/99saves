const jwt = require('jsonwebtoken');

module.exports = {
  generateToken ({ email, admin }) {
    return jwt.sign(
      { email, admin },
      process.env.JWT_SECRET,
      { expiresIn: '2 days' }
    );
  }
}
