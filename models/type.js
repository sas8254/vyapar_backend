const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Type = mongoose.model("Design", typeSchema);

module.exports = Type;
