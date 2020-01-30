const mongoose = require('mongoose');
// const keys = require('../config/prod');
const {MONGO_URI} = require('../config/env');

// const MONGO_URI = keys.mongoURI;

// Mongoose connection
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) throw err;
  console.log('[SERVICE][MONGOOSE] CONNECTION TO MONGODB IS READY');
});

// Device Schema
const deviceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
  _id: mongoose.Schema.Types.ObjectId,
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
