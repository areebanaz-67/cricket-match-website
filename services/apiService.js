const axios = require('axios');

async function fetchDataFromApi(endpoint) { 
  try {
    const response = await axios.get(endpoint); 
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
}

module.exports = { fetchDataFromApi };