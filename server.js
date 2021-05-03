const express = require("express");
if (require("dotenv")) require("dotenv").config();

const app = express();
const xss = require("xss-clean");
const http = require("http");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cron = require("node-cron");

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN.split(",");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP",
});

const server = http.createServer(app);

app.use(compression());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json({ extended: true, limit: "100kb" }));

// mongoConnect();

cron.schedule("*/5 * * * *", () => {
  console.log(new Date());
});

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 3,
    message: "Please try again later",
  }),
  require("./routes/authRoutes")
);

app.use(
  "/api/binance",
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
    message: "Please try again later",
  }),
  require("./routes/binanceRoutes")
);

app.use("*", apiLimiter, (req, res) => {
  return res.send("hello");
});

// middleware for a route
// app.use("/api/users/login", apiLimiter, (req, res) => { return res.status(200).json({ message: "success" }) })

app.use((req, res, next) => {
  res.status(404).end();
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode ? err.statusCode : 500).json({
    errors: Array.isArray(err.message) ? err.message : [err.message],
    errorCode: err.errorCode ? err.errorCode : 0,
  });
});

server.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}`)
);
