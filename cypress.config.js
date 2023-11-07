
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    authToken: process.env.CYPRESS_AUTH_TOKEN,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: true,
    html: true,
    json: false
  },
};
