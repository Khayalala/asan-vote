require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const requestIp = require("request-ip"); // ✅ Import here
const voteRoutes = require("./routes/voteRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware (Fix Order)
app.use(cors());
app.use(express.json());
app.use(requestIp.mw()); // ✅ Move this here (after 'app' is defined)

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Use Routes
app.use("/api", voteRoutes);

// ✅ Basic Route
app.get("/", (req, res) => {
  res.send("ASAN Vote Backend is running!");
});

// ✅ Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
