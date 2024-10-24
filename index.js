const express = require("express");
const { databaseConnection } = require("./src/database");
const mainApp = require("./src/app");
const { PORT, DB_URL } = require("./src/config");

const startServer = async () => {
  const app = express();
  await mainApp(app);
  await databaseConnection();
  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (error) => {
      console.log(error);
      process.exit(1);
    });
};
startServer();