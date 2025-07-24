const fs = require('fs');
const path = require('path');

// Load users from JSON file (same as login)
let users = [];
try {
  const jsonPath = path.join(__dirname, 'loginUsers.json');
  users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`[Artillery] Loaded ${users.length} users from loginUsers.json`);
} catch (e) {
  console.error('[Artillery] Failed to load loginUsers.json:', e);
}

function logContext(context, step) {
  try {
    //console.log(`[Artillery] Context at step "${step}":`, JSON.stringify(context.vars, null, 2));
  } catch (e) {
    //console.error('[Artillery] Error logging context:', e);
  }
}

module.exports = {
  pickRandomUser(context, events, done) {
    if (!users || users.length === 0) {
      console.error('[Artillery] No order placement users available!');
      return done(new Error('No users available'));
    }
    const user = users[Math.floor(Math.random() * users.length)];
    context.vars.orderUser = user;
    console.log(`[Artillery] Selected user: ${user.email}`);
    logContext(context, 'pickRandomUser');
    return done();
  },

  pickRandomProductId(context, events, done) {
    // Randomly select a product ID between 1 and 4 (inclusive)
    context.vars.productId = Math.floor(Math.random() * 4) + 1;
    console.log(`[Artillery] Selected product ID: ${context.vars.productId}`);
    logContext(context, 'pickRandomProductId');
    return done();
  },

  extractCsrfToken(requestParams, response, context, events, done) {
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
  //logContext(context, 'extractCsrfToken');
  return done();
},

  logOrderResult(requestParams, response, context, events, done) {
    console.log("[Artillery] logOrderResult called!");
    try {
      let body = response.body ? response.body.toString() : '';
      // Log request params for debugging payment step
      console.log(`[Artillery] Payment request params:`, JSON.stringify(requestParams, null, 2));
      if (context.vars && context.vars.orderUser) {
        console.log(`[Artillery] Result for user: ${context.vars.orderUser.email}`);
      }
      if (context.vars) {
        console.log(`[Artillery] CSRF token used: ${context.vars.csrf}`);
      }
      // Log status and snippet of body for debugging
      console.log(`[Artillery] Payment response status: ${response.statusCode}`);
      console.log(`[Artillery] Payment response body (first 500 chars): ${body.slice(0, 500)}`);

      if (response.statusCode === 200 && body.includes('Congratulations! Your order has been confirmed!')) {
        console.log(`[Artillery] Order confirmed!`);
        return done();
      } else {
        console.error(`[Artillery] Order NOT confirmed. Status: ${response.statusCode}`);
        return done(new Error(`Order not confirmed or HTTP error`));
      }
    } catch (e) {
      console.error("[Artillery] Exception in logOrderResult:", e);
      return done(e);
    }
  }
};