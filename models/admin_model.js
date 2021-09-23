const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    EMAIL: String,
    PASSWORD: String,
  },
  {
    versionKey: false,
    collection: "admins"
  }
);

module.exports = mongoose.model("admins", AdminSchema);
