// Variables
const voucherGenerator = require("../utils/voucherGenerator");
const request = require("request");
const axios = require('axios').default;
require('dotenv').config();
const { SUBDOMAIN, ACCESS_TOKEN, DATA_EXTENSION_KEY, CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID } = process.env

// Defines a provisional Access token variable 
var AccessToken = "";

// Defines how to get an ACCESS_TOKEN
var getAuthToken = () => {

 // 1. Requests a new Auth Token to SFMC auth API endpoint
 axios.post(`https://${SUBDOMAIN}.auth.marketingcloudapis.com/v2/token`, {

  "grant_type": "client_credentials",
  "client_id": `${CLIENT_ID}`,
  "client_secret": `${CLIENT_SECRET}`,
  "account_id": `${ACCOUNT_ID}`

})
  .then(function (response) {
    // 2. Updates the Access/Auth Token variable
    AccessToken = response.data.access_token;
    // console.log(ACCESS_TOKEN)
    // console.log(AccessToken)
    // console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  
}

// Defines how to Add the Customer filled form to SFMC Data Extension Object Records.
function addRecordToDataExtension(
  SUBDOMAIN,
  AccessToken,
  DATA_EXTENSION_KEY,
  EmailAddress,
  FirstName,
  LastName,
  CustomerSatisfaction,
  VoucherCode
) {
  // Defines Entry Event interaction
  let data = JSON.stringify({
    "ContactKey": "ign@tutanota.de",
    "EventDefinitionKey": "APIEvent-38fb1006-d66f-4fef-c6e4-23ffe76ef037",
    "Data": {
      "EmailAddress": `${EmailAddress}`,
      "FirstName": `${FirstName}`,
      "LastName": `${LastName}`,
      "CustomerSatisfaction": `${CustomerSatisfaction}`,
      "VoucherCode": `${VoucherCode}`
    }
  });

  let config = {
    method: 'post',
    url: 'https://mc2hrw9w4dptkls8hvd-wwlct100.rest.marketingcloudapis.com/interaction/v1/events',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${AccessToken}`
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
 
}

// Gets the Survey filled form data and Adds it to a SFMC Data Extension Object Record.
exports.getCustomerSurveyData = (req, res) => {
  let { EmailAddress, FirstName, LastName, CustomerSatisfaction } = req.body;
  // debug console.log(`${EmailAddress} ${FirstName} ${LastName} ${CustomerSatisfaction}`)

  // 1. Refreshes the Authorization Token
  getAuthToken();

  // 2. Generates a random voucher code
  let VoucherCode = voucherGenerator(10);
  console.log(`the voucher code generated is: ${VoucherCode}`);

  // 3. Adds Records to SMC Data Extension Object
  addRecordToDataExtension(
    SUBDOMAIN,
    AccessToken,
    DATA_EXTENSION_KEY,
    EmailAddress,
    FirstName,
    LastName,
    CustomerSatisfaction,
    VoucherCode
  );

  res.send("Customer Survey submited to Salesforce Marketing Cloud");
}