const fs = require('fs');
const path = require('path');

// Load users from JSON file once per process
let users;
try {
  const jsonPath = path.join(__dirname, 'loginUsers.json');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  users = JSON.parse(raw);
} catch (e) {
  console.error('[Artillery] Failed to load loginUsers.json:', e);
  users = [];
}

module.exports = {
  pickRandomUser(context, events, done) {
    if (!users || users.length === 0) {
      console.log('[Artillery] No login users available!');
      return done(new Error('No login users available'));
    }
    // Pick a random user for each scenario execution
    const user = users[Math.floor(Math.random() * users.length)];
    context.vars.loginUser = user;
    console.log(`[Artillery] Trying to login with ${user.email}`);
    return done();
  },

  logLoginResponse(requestParams, response, context, events, done) {
    if (context.vars && context.vars.loginUser && context.vars.loginUser.email) {
      if (response.statusCode === 200) {
        console.log(`[Artillery] Login succeeded for ${context.vars.loginUser.email}`);
        return done();
      } else {
        let body = '';
        try { body = response.body ? response.body.toString() : ''; } catch {}
        console.log(`[Artillery] Login FAILED for ${context.vars.loginUser.email}. Status: ${response.statusCode}, Body: ${body}`);
        return done(new Error(`Login failed. Status: ${response.statusCode}, Body: ${body}`));
      }
    } else {
      console.log(`[Artillery] No login user context for this response.`);
      return done();
    }
  }
};