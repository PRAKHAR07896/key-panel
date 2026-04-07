const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("OK WORKING 🚀");
});

app.get("/get-key", (req, res) => {
  const key = Math.random().toString(36).substring(2, 10).toUpperCase();
  res.json({ key });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});