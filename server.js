const express = require("express");
const server = express();

const actionsRouter = require("./actions/actionsRouter");
const projectsRouter = require("./projects/projectsRouter");
server.use(express.json());
server.use("/api/actions", actionsRouter, logger);
server.use("/api/actions", projectsRouter, logger);

server.get("/", (req, res) => {
  res.send(`API is up and running `);
});

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
