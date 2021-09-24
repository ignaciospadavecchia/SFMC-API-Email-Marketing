// Variables
const voucherGenerator = require("../utils/voucherGenerator");
const request = require("request");
const axios = require('axios').default;
require('dotenv').config();
const { SUBDOMAIN, DATA_EXTENSION_KEY, CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID, EVENT_DEFINITION } = process.env

// Defines a provisional Access token gloabal variable 
var AccessToken = "";

// Defines how to get the Access token
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
      console.log("The current Acces Token is: " + AccessToken)
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}
// Gets the token for current session
getAuthToken();

// Defines how to Add the Customer filled form to SFMC Data Extension Object Records.
function addRecordToDataExtension(
  SUBDOMAIN,
  AccessToken,
  DATA_EXTENSION_KEY,
  EVENT_DEFINITION,
  EmailAddress,
  FirstName,
  LastName,
  CustomerSatisfaction,
  VoucherCode
) {
  // Defines Entry Event interaction
  let data = JSON.stringify({
    "ContactKey": "ign@tutanota.de",
    "EventDefinitionKey": `${EVENT_DEFINITION}`,
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
exports.getCustomerSurveyData = async (req, res) => {

  // 1. Retrieves inputs form express request object
  let { EmailAddress, FirstName, LastName, CustomerSatisfaction } = req.body;
  console.log(`The user form inputs are: ${EmailAddress} ${FirstName} ${LastName} ${CustomerSatisfaction}`)

  // 2. Generates a random voucher code
  let VoucherCode = voucherGenerator(10);
  console.log(`The discount voucher code generated is: ${VoucherCode}`);

  // 3. Adds the Records to SMC Data Extension Object
  if (AccessToken.expires_in != 0) {
    addRecordToDataExtension(
      SUBDOMAIN,
      AccessToken,
      DATA_EXTENSION_KEY,
      EVENT_DEFINITION,
      EmailAddress,
      FirstName,
      LastName,
      CustomerSatisfaction,
      VoucherCode
    );
  } else if (AccessToken.expires_in == 0) {
    getAuthToken();
    addRecordToDataExtension(
      SUBDOMAIN,
      AccessToken,
      DATA_EXTENSION_KEY,
      EVENT_DEFINITION,
      EmailAddress,
      FirstName,
      LastName,
      CustomerSatisfaction,
      VoucherCode
    );
  }
  res.send("Customer Survey submited to Salesforce Marketing Cloud");
}