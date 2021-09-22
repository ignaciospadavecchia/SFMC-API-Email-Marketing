'use strict'

const http = require('http'); // request listener
const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();


const request = require("request");


// personal lib
// const utils = require('utils');

const PORT = process.env.PORT || 3000

const server = http.createServer(app);

function generate_voucher_code(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

// CONFIG:

let DataExtensionKey = "NikeCS_Data_Extension";
let ClientID = "0gkpfbzw5mhrx00hyyuk7m7h"
let ClientSecret = "L0ApViEw9fR4CAp7yQ6UowFi"
let AccountID = "13828757-ff57-4c76-a315-2852666b1af4"
let SubDomain = "mc2hrw9w4dptkls8hvd-wwlct100"

// app.use(utils()); 
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(cors()); // handles cross-origin headers, to let other app in other domain consume this resources

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/salesforce', (req, res) => {
    let {EmailAddress} = req.body;
    let {FirstName} = req.body;
    let {LastName} = req.body;
    let {CustomerSatisfaction} = req.body;
    
    // TODO: validate all fields

    // debug
    console.log(`${EmailAddress} ${FirstName} ${LastName} ${CustomerSatisfaction}`);

    // generar un random code
    // let VoucherCode = utils.generateVoucher(10);
    let VoucherCode = generate_voucher_code(10);
    console.log(`the voucher code generated is: ${VoucherCode}`);
    
    // send the recived information to salesforce

    // we need to get the access token

    // we need to send the information
    
    res.send("ok");

})

app.use(express.static(__dirname + "/public"));

// app.get('/api/sessions', async (req, res) => {
//     const sessions = await fs.readFile(path.join(__dirname, 'sessions.json'), 'utf8')
//     res.json(JSON.parse(sesssions));
// })

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})