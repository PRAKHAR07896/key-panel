const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ serve frontend (IMPORTANT)
app.use(express.static("public"));

// ✅ API route
app.get("/get-key", (req, res) => {
  const key = Math.random().toString(36).substring(2, 10).toUpperCase();
  res.json({ key });
});

// ✅ start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});