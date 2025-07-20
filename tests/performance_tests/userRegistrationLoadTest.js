const crypto = require('crypto');

function randomId() {
  return crypto.randomBytes(4).toString('hex');
}

module.exports = {
  generateUser(context, events, done) {
    const uniqueId = randomId();
    const email = `testuser_${uniqueId}@example.com`;
    // Hardcoded password for simplicity
    const password = "Password123!";

    // Attach user details to context.vars
    context.vars.user = {
      email,
      password,
      name: `Test${uniqueId}`,
      firstname: `First${uniqueId}`,
      lastname: `Last${uniqueId}`,
    };

    // Log the email being created
    console.log(`[Artillery] Creating user: ${email}`);

    return done();
  },

  checkDeleteResponse(requestParams, response, context, events, done) {
    // Log the email being deleted
    if (context.vars && context.vars.user && context.vars.user.email) {
      console.log(`[Artillery] Deleting user: ${context.vars.user.email}`);
    }

    try {
      const body = JSON.parse(response.body);
      if (
        response.statusCode === 200 &&
        body.responseCode === 200 &&
        typeof body.message === "string" &&
        body.message.toLowerCase().includes("account deleted")
      ) {
        return done();
      } else {
        return done(new Error("User deleted API call failed. Message: " + body.message));
      }
    } catch (e) {
      return done(new Error("User deleted API call failed. Bad response JSON."));
    }
  }
};