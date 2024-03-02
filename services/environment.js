const dotenv = require('dotenv');

dotenv.config();

const env = {
  port: process.env.PORT,
  session_secret: process.env.SESSION_SECRET,
  api_key: process.env.PI_API_KEY,
  platform: process.env.PLATFORM_API_URL,
};

module.exports = env