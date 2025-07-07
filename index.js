// server/index.js
const express = require("express");
const cors = require("cors");
const Router = require("./Routes/route.js")

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to parse JSON request bodies
app.use(express.json());


// Routes
app.use("/api",Router)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
