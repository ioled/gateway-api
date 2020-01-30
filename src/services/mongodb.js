const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI === undefined) {
  console.log('[Gateway API][Error] No Mongo URI specified in the env variables');
  process.exit(1);
}

// Mongoose connection
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) throw err;
  console.log('[Service][Mongoose] Connection to MongoDB is ready');
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
