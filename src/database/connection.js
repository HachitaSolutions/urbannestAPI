const mongoose = require("mongoose");
const { DB_URL } = require("../config");
module.exports = async () => {
  try {
    mongoose.connect(DB_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Error");
    console.error(error);
    process.exit(1);
  }
};
