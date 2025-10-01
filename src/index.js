const express = require("express");
const morgan = require("morgan");
require ("dotenv").config();
const db = require("./config/firebase");
const verifyToken = require("./utils/auth");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/data", verifyToken, async (req, res) => {
  const data = await db.collection("users").get();
  res.json(data.docs.map(doc => doc.data()));
});