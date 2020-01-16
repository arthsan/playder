const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.USER_MONGO,
  pass: process.env.PASSWORD,
  admin: process.env.ADMIN
}

module.exports = config;