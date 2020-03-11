const server = require("./api/server.js");

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`\n*** Getting stuff from http://localhost:${PORT} ***\n`);
});
