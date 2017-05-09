const PORT = process.env.PORT || 3000;
const HEROKU_URL = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/`;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL;
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
  CLOUDINARY_UPLOAD_URL
};
