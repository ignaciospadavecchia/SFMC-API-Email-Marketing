'use strict'

const http = require('http'); // request listener
const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000

const server = http.createServer(app);

app.use(cors()); // handles cross-origin headers, to let other app in other domain consume this resources

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`<h1>Hola</h1>`);
})

app.get('/api/sessions', async (req, res) => {
    const sessions = await fs.readFile(path.join(__dirname, 'sessions.json'), 'utf8')
    res.json(JSON.parse(sesssions));
})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
