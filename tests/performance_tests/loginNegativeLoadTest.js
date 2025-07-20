// List of deliberately invalid credentials for negative testing
const invalidUsers = [
  { email: "nonexistent_user@example.com", password: "wrongpassword" },
  { email: "test@example.com", password: "incorrect" },
  { email: "invalidemail", password: "123456" },
  { email: "", password: "" }, // empty email
  { email: "user@example.com", password: "" } // missing password
];

module.exports = {
  pickRandomInvalidUser(context, events, done) {
    // Pick a random invalid user for each scenario execution
    const user = invalidUsers[Math.floor(Math.random() * invalidUsers.length)];
    context.vars.invalidLoginUser = user;
    console.log(`[Artillery] Trying to login with INVALID credentials: ${user.email}`);
    return done();
  },

  logNegativeLoginResponse(requestParams, response, context, events, done) {
    if (context.vars && context.vars.invalidLoginUser && context.vars.invalidLoginUser.email !== undefined) {
      if (response.statusCode !== 200) {
        console.log(`[Artillery] Login correctly failed for ${context.vars.invalidLoginUser.email}. Status: ${response.statusCode}`);
        return done();
      } else {
        let body = '';
        try { body = response.body ? response.body.toString() : ''; } catch {}
        console.log(`[Artillery] Login UNEXPECTEDLY SUCCEEDED for ${context.vars.invalidLoginUser.email}. Status: ${response.statusCode}, Body: ${body}`);
        return done(new Error(`Login unexpectedly succeeded with invalid credentials. Status: ${response.statusCode}, Body: ${body}`));
      }
    } else {
      console.log(`[Artillery] No invalid login user context for this response.`);
      return done();
    }
  }
};