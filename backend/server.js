require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const runRoutes = require("./routes/runRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/runs", runRoutes);

// IMPORTANT FIX
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
