const PORT = process.env.PORT || 3000;
const HEROKU_URL = process.env.HEROKU_URL || '/';
const CLOUDINARY_UPLOAD_PRESET = 'k0xbougu';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/kevinsoul/upload';
const API_URL = (function apiUrl(env) {
  switch (env) {
    case 'production':
    case 'staging':
      return `${HEROKU_URL}api`;
    default:
      return `http://localhost:${PORT}/api`;
  }
}(process.env.NODE_ENV));

module.exports = {
  API_URL,
  PORT,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL,
};
