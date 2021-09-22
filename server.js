"use strict";

const http = require("http"); // request listener
const fs = require("fs"); // fs/promises
const path = require("path");
const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// app.use(utils());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cors()); // handles cross-origin headers, to let other app in other domain consume this resources
app.use(express.static(__dirname + "/public"));

// personal lib
// const utils = require('utils');

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
let ClientID = "0gkpfbzw5mhrx00hyyuk7m7h";
let ClientSecret = "L0ApViEw9fR4CAp7yQ6UowFi";
let AccountID = "13828757-ff57-4c76-a315-2852666b1af4";
let SubDomain = "mc2hrw9w4dptkls8hvd-wwlct100";

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/salesforce", (req, res) => {
  let { EmailAddress } = req.body;
  let { FirstName } = req.body;
  let { LastName } = req.body;
  let { CustomerSatisfaction } = req.body;

  // TODO: validate all fields

  // debug
  console.log(
    `${EmailAddress} ${FirstName} ${LastName} ${CustomerSatisfaction}`
  );

  function add_record_data_extension(SubDomain,AccessToken,DataExtensionKey,EmailAddress,FirstName,LastName,CustomerSatisfaction,VoucherCode) {
    var options = {
      method: "POST",
      url: `https://${SubDomain}.soap.marketingcloudapis.com/Service.asmx`,
      headers: {
        "Content-Type": "application/xml",
      },
      body: `<?xml version="1.0" encoding="UTF-8"?>\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\n<s:Header>\n<a:Action s:mustUnderstand="1">Create</a:Action>\n<a:To s:mustUnderstand="1">https://${SubDomain}.soap.marketingcloudapis.com/Service.asmx</a:To>\n<fueloauth xmlns="http://exacttarget.com">${AccessToken}</fueloauth>\n</s:Header>\n<s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n<CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">\n<Options/>\n<Objects xsi:type="DataExtensionObject">\n<PartnerKey xsi:nil="true"/>\n<ObjectID xsi:nil="true"/>\n<CustomerKey>${DataExtensionKey}</CustomerKey>\n<Properties>\n<Property>\n<Name>EmailAddress</Name>\n<Value>${EmailAddress}</Value>\n</Property>\n<Property>\n<Name>FirstName</Name>\n<Value>${FirstName}</Value>\n</Property>\n<Property>\n<Name>LastName</Name>\n<Value>${LastName}</Value>\n</Property>\n<Property>\n<Name>VoucherCode</Name>\n<Value>${VoucherCode}</Value>\n</Property>\n<Property>\n<Name>CustomerSatisfaction</Name>\n<Value>${CustomerSatisfaction}</Value>\n</Property>\n</Properties>\n</Objects>\n</CreateRequest>\n</s:Body>\n</s:Envelope>`,
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(`Conten Error: ${response.body}`);
    });
  }



  // generar un random code
  // let VoucherCode = utils.generateVoucher(10);
  let VoucherCode = generate_voucher_code(10);
  console.log(`the voucher code generated is: ${VoucherCode}`);

  // send the recived information to salesforce

  // we need to get the access token
  var AccessToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6IjQiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiJaWjhzYXE3b1ZZcEs4aGF1TW52MVBFd24iLCJjbGllbnRfaWQiOiIwZ2twZmJ6dzVtaHJ4MDBoeXl1azdtN2giLCJlaWQiOjEwMDAwMTY4Nywic3RhY2tfa2V5IjoiUzEwIiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciJ9.DAoZ8if7jVjIy5V1aXuOlZAw9c-tLDop7j3KkoD_xDk.4YqjUhwUrr0UAp3Rb-UnWqYMpZmPSBqB5jmvFHM-qNKFmmscTFohdGTad1xWukWXHcVLTuc5rZhwImzjZJlJ1VrKTNR5Cw1L6zA1tNG-KivzGPeu81nrS-3TqyruPRDKkaEBjG1wHhG4_2O2BPjHsfdA70yim-IA3gDmpl_jXa0gayMvvJ6"
  
  // we need to send the information
  add_record_data_extension(SubDomain,AccessToken,DataExtensionKey,EmailAddress,FirstName,LastName,CustomerSatisfaction,VoucherCode)

  res.send("ok");
});

// app.get('/api/sessions', async (req, res) => {
//     const sessions = await fs.readFile(path.join(__dirname, 'sessions.json'), 'utf8')
//     res.json(JSON.parse(sesssions));
// })

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
