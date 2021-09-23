"use strict";

// All server requirements
const express = require("express");
const path = require("path");
const cors = require("cors");
const indexRouter = require("./routes/index");

// Inits
const server = express();
const PORT = process.env.PORT || 3000;

// Viewengine 
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "public")));
server.use(cors()); // handles cross-origin headers, to let other server in other domain consume this resources

// Routes
server.get('/favicon.ico', (req, res) => res.status(204).send());
server.use('/', indexRouter);

// Port
server.listen(PORT, () => {
console.log(`Server listening on http://localhost:${PORT}`);
});
