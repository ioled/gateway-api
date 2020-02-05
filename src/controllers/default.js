const axios = require('axios');

exports.defaultGetController = async (apiName, url, query) => {
  console.log(`[Gateway API][GET][${apiName.toUpperCase()}][ ${query} ]`);
  try {
    const {data} = await axios.get(`${url}${query}`);
    console.log(`[Gateway API][GET][${apiName.toUpperCase()}][ ${query} ][Response]`, data);
    return data;
  } catch (error) {
    console.log(`[Gateway API][GET][${apiName.toUpperCase()}][ ${query} ][Error]:`, error);
    throw new Error(error);
  }
};
