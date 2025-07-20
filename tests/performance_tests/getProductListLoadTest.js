module.exports = {
  logGetProductsResponse(requestParams, response, context, events, done) {
    if (response.statusCode === 200) {
      console.log('[Artillery] Fetched products list successfully.');
      return done();
    } else {
      let body = '';
      try {
        body = response.body ? response.body.toString() : '';
      } catch (e) {}
      console.log(`[Artillery] Failed to fetch products. Status: ${response.statusCode}, Body: ${body}`);
      return done(new Error(`Failed to fetch products. Status: ${response.statusCode}, Body: ${body}`));
    }
  }
};