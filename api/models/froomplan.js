const mongoose = require('mongoose');

module.exports = mongoose.model('FloorPlan', new mongoose.Schema({
  floor:String,
  rooms: Array
}, { collection : 'fr' }));