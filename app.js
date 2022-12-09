const express = require("express");
const cors = require("cors");
const app = express();

const path = require("path")

const env = require("dotenv");
env.config();

const pool = require("./db/index");

const port = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers");
    next();
});
// API functions
const router = require("./api_functions/index");

app.use("/api", router);

// Static files served

app.use(express.static(path.join(__dirname, './client/build')));
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Static files served to production
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, './client/build')));
    app.use('/*', (req, res) => {
      res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}


app.listen(port, () => {
    console.log("Running on port", port);
});