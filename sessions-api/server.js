'use strict'

const http = require('http')
const sessions = require('./sessions.json')
const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    const url = req.url

    if(url === '/'){
        res.writeHead(200, {'Content-Type':'text/html'})
        res.write('<h1>Hola!</h1>')
    } else if (url === '/api/sessions') {
        res.writeHead(200, { 'Content-Type' : 'application/json'})
        res.write(JSON.stringify(sessions))
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('404: ${url} not found')
    }
    res.end()
})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
