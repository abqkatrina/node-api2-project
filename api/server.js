const express = require('express');
const postRouter = require("./posts/postRouter.js");
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());
// server.use('/', (req, res) => res.send('API up and running!'));

server.use('/api/posts', postRouter);

module.exports = server;