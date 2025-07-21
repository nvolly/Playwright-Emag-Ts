const { faker } = require('@faker-js/faker');

/**
 * Generate test authentication data
 * @param {Object} userContext - User context
 * @param {Object} events - Events object
 * @param {Function} done - Callback function
 */
function generateAuthData(userContext, events, done) {
  // Use environment variables or generate test data
  userContext.vars.email = process.env.TEST_EMAIL || `test_${Date.now()}@example.com`;
  userContext.vars.password = process.env.TEST_PASSWORD || 'Test@1234';
  return done();
}

/**
 * Generate test resource data
 * @param {Object} userContext - User context
 * @param {Object} events - Events object
 * @param {Function} done - Callback function
 */
function generateResourceData(userContext, events, done) {
  userContext.vars.resourceName = faker.commerce.productName();
  userContext.vars.resourceDescription = faker.lorem.sentence();
  return done();
}

module.exports = {
  generateAuthData,
  generateResourceData
};
