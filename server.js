/* eslint-disable no-console */
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const history = require('connect-history-api-fallback');

const server = express();
server.use(history());
server.use('/', serveStatic(path.join(__dirname, '/dist')));

const port = process.env.PORT || 8080;
server.listen(port);

console.log(`Listening on port ${port}`);
