const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// 👇 frontend serve karega
app.use(express.static("public"));

function generateKey() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

app.get("/get-key", (req, res) => {
  const key = generateKey();
  res.json({ key });
});

app.listen(3000, () => console.log("Server running"));