const mongoose = require('mongoose');

module.exports = mongoose.model('AirC', new mongoose.Schema({
  name: String,
  floor: String,
  room: String,
  status: Boolean,
  sensorData: Array
}, { collection : 'acond' }));
