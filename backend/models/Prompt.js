const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  category: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  usageCount: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prompt', promptSchema);