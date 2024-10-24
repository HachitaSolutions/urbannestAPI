const express = require("express");
const cors = require("cors");
const HandleErrors = require("./utils/error-handler");
const { user } = require("./api");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("<h1>Nagesh Group</h1>");
  });
  //API's
  user(app);
  //Error Handling
  app.use(HandleErrors);
};
