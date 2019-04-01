const app = require('../server');

//Config http server
const server = require('http').Server(app);
const port = 3030;

//Server listening
server.listen(port);
console.log(`Running on port ${port}`);