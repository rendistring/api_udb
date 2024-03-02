const axios = require('axios');
const env = require('../services/environment.js');

const client = axios.create({
  baseURL: env.platform,
  timeout: 20000,
  headers: {
    'Authorization': `Bearer ${env.api_key}`
  }
});

module.exports = client