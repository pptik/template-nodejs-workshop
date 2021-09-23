require("dotenv").config();
const mongoose = require("mongoose");
const { mongoUrl, mongoOptions } = require("../config");

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

/**
 * @function createConnection
 *
 * Create MongoDB connection. Configs are supplied automatically in the method
 * @returns {Promise<void>}
 */
const createConnection = async () => {
  await mongoose.connect(mongoUrl, mongoOptions);
};

module.exports = {
  createConnection
};