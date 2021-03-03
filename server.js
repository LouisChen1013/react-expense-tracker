const express = require("express");
// allow us to create environment variables(e.g., database url, ports)
const dotenv = require("dotenv");
const colors = require("colors");
// logging
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");

// access the variables in the config file
dotenv.config({ path: "./config/config.env" });
// use `require('dotenv').config()` if your .env file is in the root directory

connectDB();

const router = require("./routes/transaction");

const app = express();

// morgan can show us the request methods and status (GET,POST, and etc)
// npm run dev serve backend on port 3000 and frontend on port 3000 in the development env
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body-parser: read the incoming request bodies in a middleware before you handle it.
app.use(express.json());

// http://localhost:5000/api/v1/transaction
app.use("/api/v1/transaction", router);

// set static folder if we deploy in the production env
// npm start will now serve both backend(node) and frontend(react) on port 5000
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // set index.html in the build folder for fronted end routing (entry point)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "bulid", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

// create the Node.js web server at the specified host and port.
// use colors library to display our msg in font and color we define (yellow.bold)
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);
