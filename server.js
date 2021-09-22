"use strict";

// All server requirements
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser); // 
const request = require("request");
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
server.use(bodyParser.xml());

// Keys
let DataExtensionKey = "NikeCS_Data_Extension";
let ClientID = "0gkpfbzw5mhrx00hyyuk7m7h";
let ClientSecret = "L0ApViEw9fR4CAp7yQ6UowFi";
let AccountID = "13828757-ff57-4c76-a315-2852666b1af4";
let SubDomain = "mc2hrw9w4dptkls8hvd-wwlct100";

// Routes
server.get('/favicon.ico', (req, res) => res.status(204).send());
server.use('/', indexRouter);

// Port
server.listen(PORT, () => {
console.log(`Server listening on http://localhost:${PORT}`);
});
