require("dotenv").config();
const axios = require("axios");

console.log("Key loaded:", !!process.env.OPENROUTER_API_KEY);

setTimeout(() => {
  console.log("Force exiting after 35s");
  process.exit(1);
}, 35000);

async function testAI() {
  try {
    console.log("Starting request...");

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      
     {
  model: "google/gemini-3.1-flash-lite",
  messages: [
    {
      role: "user",
      content: "Create a fantasy kingdom name and one sentence of lore."
    }
  ],
  max_tokens: 200
},
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "test-script"
        },
        timeout: 30000
      }
    );

    console.log("Response received!\n");
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    if (error.response) {
      console.log("API Error:");
      console.log(error.response.data);
    } else if (error.code === "ECONNABORTED") {
      console.log("Request timed out after 30 seconds.");
    } else {
      console.log("Error:");
      console.log(error.message);
    }
  }
}

testAI();