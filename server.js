"use strict";

// All server requirements
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
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
/* server.use(
    bodyParser.xml({
        limit: '1MB', // Reject payload bigger than 1 MB
        xmlParseOptions: {
        normalize: true, // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false, // Only put nodes in array if >1
        },
    }),
); */

// Routes
server.get('/favicon.ico', (req, res) => res.status(204).send());
server.use('/', indexRouter);

// Port
server.listen(PORT, () => {
console.log(`Server listening on http://localhost:${PORT}`);
});
