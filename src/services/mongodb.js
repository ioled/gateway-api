const mongoose = require('mongoose');
const {MONGO_URI} = require('../config/env');

// Mongoose connection
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) throw err;
  console.log('[Gateway API][Service][Mongoose] Connection to MongoDB is ready');
});

// Device Schema
const deviceSchema = mongoose.Schema({
  duty: Number,
  state: Boolean,
  timerOn: String,
  timerOff: String,
  timerState: Boolean,
  deviceId: String,
  _user: mongoose.Schema.Types.ObjectId,
  alias: String,
});

const devices = mongoose.model('devices', deviceSchema);

// User Schema
const userSchema = mongoose.Schema({
  devices: mongoose.Schema.Types.Array,
  googleID: String,
  name: String,
  lastName: String,
  email: String,
  photo: String,
});

const users = mongoose.model('users', userSchema);

module.exports = {
  users,
  devices,
};
