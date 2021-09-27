const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    EMAIL: String,
    PASSWORD: String,
  },
  {
    versionKey: false,
    collection: "pengguna"
  }
);

module.exports = mongoose.model("pengguna", AdminSchema);
