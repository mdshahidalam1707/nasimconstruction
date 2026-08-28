const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  projectType: { type: String, enum: ["Construction", "Renovation", "Interior"], default: "Construction" },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", contactSchema);