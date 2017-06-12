const jwt = require('jsonwebtoken');

module.exports = {
  generateToken (user) {
    return jwt.sign(
      user,
      process.env.JWT_SECRET,
      // TODO: pensar num jeito melhor de fazer o refresh do token de acesso
      { expiresIn: '100y' }
    );
  }
}
