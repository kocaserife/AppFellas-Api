const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5000;
app.get('/api/flights', async (req, res) => {
  try {
    const options = {
      url: 'https://api.schiphol.nl/public-flights/flights',
      method: 'GET',
      params: {
        includedelays: false,
        page: 0,
        sort: '+scheduleTime'
      },
      headers: {
        'Accept': 'application/json',
        'app_id': '5531f10f',
        'app_key': '3c5311efc26a5807fc8385141a11fdea',
        'ResourceVersion': 'v4'
      }
    };
    const response = await axios(options);
    res.json(response.data); 
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching flights',
      error: error.response ? error.response.data : error.message
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
