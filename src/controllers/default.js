const axios = require('axios');

exports.defaultGetController = async (apiName, url, query) => {
  console.log(`[Gateway API][GET][${name.toUpperCase()}][ ${query} ]`);
  try {
    const {data} = await axios.get(`${url}${query}`);
    console.log(`[Gateway API][GET][${name.toUpperCase()}][ ${query} ][Response]`, data);
    return data;
  } catch (error) {
    console.log(`[Gateway API][GET][${name.toUpperCase()}][ ${query} ][Error]:`, error);
    throw new Error(error);
  }
};
