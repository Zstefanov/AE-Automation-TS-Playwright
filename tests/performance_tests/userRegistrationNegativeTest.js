const fs = require('fs');
const path = require('path');

// Load registered users
let registeredUsers = [];
try {
  const jsonPath = path.join(__dirname, 'loginUsers.json');
  registeredUsers = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`[Artillery] Loaded ${registeredUsers.length} registered users`);
} catch (e) {
  console.error('[Artillery] Failed to load loginUsers.json:', e);
}

function pickRandomRegisteredUser(context, events, done) {
  if (!registeredUsers || registeredUsers.length === 0) {
    console.error('[Artillery] No registered users available!');
    return done(new Error('No registered users available'));
  }
  const user = registeredUsers[Math.floor(Math.random() * registeredUsers.length)];
  context.vars.name = "NegativeTestUser";
  context.vars.email = user.Email || user.email;
  console.log(`[Artillery] Picked already-used email: ${context.vars.email}`);
  done();
}

function extractCsrfToken(requestParams, response, context, events, done) {
  let token = "";
  try {
    const html = response.body ? response.body.toString() : "";
    const match = html.match(/name=['"]csrfmiddlewaretoken['"] value=['"]([^'"]+)/);
    if (match && match[1]) {
      token = match[1];
      console.log(`[Artillery] Extracted CSRF token: ${token}`);
    } else {
      console.warn("[Artillery] CSRF token not found in response body!");
      console.warn(`[Artillery] Response snippet: ${html.slice(0, 300)}`);
    }
  } catch (e) {
    console.error("[Artillery] Error extracting CSRF:", e);
  }
  context.vars.csrf = token;
  done();
}

// Strict negative registration: only treat as success if status is 403,
// or status is 200 and body contains expected error message.
// All others are treated as failure.
function logNegativeRegistration(requestParams, response, context, events, done) {
  const status = response.statusCode;
  const body = response.body ? response.body.toString() : '';
  console.log(`[Artillery] Negative registration status: ${status}`);
  console.log(`[Artillery] Negative registration body: ${body.slice(0, 300)}`);

  // Success: status 403
  if (status === 403) {
    console.log("[Artillery] Registration failed as expected (403 Forbidden)");
    return done();
  }
  // Success: status 200 + error message in body
  if (
    status === 200 &&
    (body.toLowerCase().includes("already exists") ||
      body.toLowerCase().includes("email address already"))
  ) {
    console.log("[Artillery] Registration failed as expected (error message in body)");
    return done();
  }

  // Failure: everything else
  console.error(`[Artillery] Registration unexpectedly succeeded or failed with unexpected error! Status: ${status}, Body: ${body.slice(0, 300)}`);
  return done(new Error("Registration did not fail as expected for already-used email!"));
}

module.exports = {
  pickRandomRegisteredUser,
  extractCsrfToken,
  logNegativeRegistration
};