const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

const apiData = require("./mongoDB/apiData");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!"))
  .catch((error) => {
    console.error("Connection error:", error);
    process.exit(1); // Exit the application on connection error
  });

app.get("/", async function (req, res) {
  try {
    const result = await apiData.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "An error occurred while fetching items" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
