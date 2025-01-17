const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  table: { type: String, required: true },
  image: { type: String, required: false },
});

module.exports = mongoose.model('Guest', guestSchema);
