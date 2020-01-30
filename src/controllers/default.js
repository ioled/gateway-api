const axios = require('axios');

exports.defaultGetController = async (apiName, url, query) => {
  console.log(`[API-GATEWAY][GET][${name.toUpperCase()}][ ${query} ]`);
  try {
    const {data} = await axios.get(`${url}${query}`);
    console.log(`[API-GATEWAY][GET][${name.toUpperCase()}][ ${query} ][RESPONSE]`, data);
    return data;
  } catch (error) {
    console.log(`[API-GATEWAY][GET][${name.toUpperCase()}][ ${query} ][ERROR]:`, error);
    throw new Error(error);
  }
};
