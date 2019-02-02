'use strict'
require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  FRONTEND_HOST: '"https://lcwc.nathanheffley.com"',
  API_HOST: '"https://lcwc.nathanheffley.com/.netlify/functions"',
  HERE_APP_ID: `"${process.env.HERE_APP_ID}"`,
  HERE_APP_CODE: `"${process.env.HERE_CODE}"`
}
