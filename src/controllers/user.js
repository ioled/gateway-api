const jwt = require('jsonwebtoken');
const axios = require('axios');
const {JWT_KEY} = require('../config/env');
const {USER_URL} = require('../config/env');

exports.currentUser = async (req, res) => {
  console.log('[Gateway-API][GET][Current User][ /currentUser ][Request]', req.params, req.body);
  let token = req.headers['authorization'];
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, JWT_KEY, async (err, decoded) => {
      if (err) {
        console.log('[Gateway-API][GET][Current User][ /currentUser ][Error]: Invalid Token');
        return res.status(500).json({error: 'Invalid Token'});
      } else {
        const {user} = decoded;
        try {
          console.log(user);
          const {data} = await axios.post(`${USER_URL}/user`, {user});
          console.log(data);
          res.status(200).json({data});
        } catch (error) {
          console.log('[Gateway-API][GET][Current User][ /currentUser ][Error]', error);
          return res.status(500).json({error});
        }
      }
    });
  }
};
