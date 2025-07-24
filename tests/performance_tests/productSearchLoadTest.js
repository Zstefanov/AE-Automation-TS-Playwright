const searchTerms = [
  "shirt", "jeans", "dress", "shoes", "jacket",
  "t-shirt", "pants", "skirt", "blouse", "coat"
];

module.exports = {
  pickRandomSearchTerm(context, events, done) {
    const term = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    context.vars.searchTerm = term;
    console.log(`[Artillery] Selected search term: ${term}`);
    return done();
  },
  logSearchResult(requestParams, response, context, events, done) {
    const status = response.statusCode;
    const body = response.body ? response.body.toString().slice(0, 300) : '';
    console.log(`[Artillery] Search response status: ${status}`);
    console.log(`[Artillery] Response body (first 300 chars): ${body}`);
    if (status === 200) {
      return done();
    } else {
      return done(new Error(`Search failed with status ${status}`));
    }
  }
};