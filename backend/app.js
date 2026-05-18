// ===== DEPENDENCIES =====
const express = require("express");
const db = require("./db/db");
const cookie = require("cookie-parser");
const helmet = require("helmet");
const errorHandler = require("./middlewear/errorHandler");
const cors = require("cors");
const path = require("path");

// ===== IMPORT ROUTE HANDLERS =====
// Each router handles a specific resource (auth, rooms, bookings, admin)
const authRouter = require("./routes/authRoute");
const roomRouter = require("./routes/roomRoute");

// ===== INITIALIZE EXPRESS APP =====
const app = express();

// ===== MIDDLEWARE STACK =====
// Set security HTTP headers
app.use(cookie()); // Parse cookies from requests
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  "/room-photos",
  express.static(path.join(__dirname, "views", "room-photos")),
);

// ===== ROUTE HANDLERS =====

app.use("/auth", authRouter);
app.use("/rooms", roomRouter);

// ===== HEALTH CHECK ROUTE =====
app.get("/", (req, res) => {
  res.send("Hello");
});

// ===== START SERVER =====//GLOBAL ERROR HANDLER
app.use(errorHandler);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
