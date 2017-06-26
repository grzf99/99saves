const PORT = process.env.PORT || 3000;
const HEROKU_URL = `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL;
const EMAIL_SENDER = process.env.EMAIL_SENDER;
const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;

const API_URL = `${APP_URL}/api`;

module.exports = {
  API_URL,
  APP_URL,
  PORT,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL,
  EMAIL_SENDER
};
