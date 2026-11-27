const express = require("express");
const app = express();

const server = require("./server");

app.use(server);

module.exports = app;