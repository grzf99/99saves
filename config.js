const API_URL = (function apiUrl(env) {
  switch (env) {
    case 'production':
      return 'http://localhost:3000/api';
    case 'staging':
      return 'http://localhost:3000/api';
    default:
      return 'http://localhost:3000/api';
  }
}(process.env.NODE_ENV));

module.exports = {
  API_URL,
};
