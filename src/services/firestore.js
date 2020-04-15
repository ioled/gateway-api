const Firestore = require('@google-cloud/firestore');

const {projectId} = require('../config/env');

const db = new Firestore({
  projectId,
});

const devicesRef = db.collection('devices');
const usersRef = db.collection('users');

exports.getUser = async (googleID) => {
  try {
    const snapshot = await usersRef.where('googleID', '==', googleID).get();

    if (snapshot.empty) {
      console.log('[Gateway-API][Firestore][getUser] No matching documents');
      return null;
    } else {
      let userId, user;
      snapshot.forEach((doc) => {
        userId = doc.id;
        user = doc.data();
      });
      return {userId, user};
    }
  } catch (error) {
    console.log('[Gateway-API][Firestore][getUser]', error);
    return null;
  }
};

exports.getDevice = async (userID) => {
  try {
    const snapshot = await devicesRef.where('user', '==', userID).get();
    const devices = snapshot.docs.map((doc) => doc.data()); // Not tested yet
    return devices;
  } catch (error) {
    console.log('[Gateway-API][Firestore][getDevices]', error);
    return null;
  }
};

exports.isAdmin = (user) => {
  if (user.role === 'admin') return true;
  else return false;
};

exports.saveUser = async (user) => {
  try {
    const ref = await usersRef.add(user);
    console.log('[Gateway-API][Firestore][Save User] New User Added:', user.googleID);
    return user.googleID;
  } catch (error) {
    console.log(
      '[Gateway-API][Firestore][Save User][Error] There was an error saving the new user',
      error,
    );
    throw new Error(error);
  }
};
