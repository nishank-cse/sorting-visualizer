const axios = require("axios");

const test = async () => {
  try {
    // 1️⃣ Send a POST request to save a run
    const postRes = await axios.post("http://localhost:5000/api/runs", {
      algorithm: "Test Sort",
      timeTaken: 123,
      arraySize: 50
    });
    console.log("POST Response:", postRes.data);

    // 2️⃣ Send a GET request to fetch all runs
    const getRes = await axios.get("http://localhost:5000/api/runs");
    console.log("GET Response (History):", getRes.data);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

test();
