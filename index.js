const server = require("./api/server.js");

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n*** Retrieving on http://localhost:${PORT} ***\n`);
});