require("dotenv").config();
const axios = require("axios");

async function checkModels() {
  try {
    const response = await axios.get(
      "https://openrouter.ai/api/v1/models",
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );

    console.log("Connected!");
    console.log("Models found:", response.data.data.length);

    response.data.data
      .slice(0, 20)
      .forEach(m => console.log(m.id));

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

checkModels();