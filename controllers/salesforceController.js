const voucherGenerator = require("../utils/voucherGenerator");
const request = require("request");
const axios = require('axios').default;
require('dotenv').config();
const { SUBDOMAIN, ACCESS_TOKEN, DATA_EXTENSION_KEY, CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID } = process.env

/* Defines how to Add Records to Salesforce Marketing Cloud Data Extension Object */
function addRecordToDataExtension(
  SUBDOMAIN,
  ACCESS_TOKEN,
  DATA_EXTENSION_KEY,
  EmailAddress,
  FirstName,
  LastName,
  CustomerSatisfaction,
  VoucherCode
) {
  var options = {
    method: "POST",
    url: `https://${SUBDOMAIN}.soap.marketingcloudapis.com/Service.asmx`,
    headers: {
      "Content-Type": "application/xml",
    },
    body: `<?xml version="1.0" encoding="UTF-8"?>
    <s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">

        <s:Header>
            <a:Action s:mustUnderstand="1">Create</a:Action>
            <a:To s:mustUnderstand="1">https://${SUBDOMAIN}.soap.marketingcloudapis.com/Service.asmx</a:To>
            <fueloauth xmlns="http://exacttarget.com">${ACCESS_TOKEN}</fueloauth>
        </s:Header>
        <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">
                <Options />
                <Objects xsi:type="DataExtensionObject">
                    <PartnerKey xsi:nil="true" />
                    <ObjectID xsi:nil="true" />
                    <CustomerKey>${DATA_EXTENSION_KEY}</CustomerKey>
                    <Properties>
                        <Property>
                            <Name>EmailAddress</Name>
                            <Value>${EmailAddress}</Value>
                        </Property>
                        <Property>
                            <Name>FirstName</Name>
                            <Value>${FirstName}</Value>
                        </Property>
                        <Property>
                            <Name>LastName</Name>
                            <Value>${LastName}</Value>
                        </Property>
                        <Property>
                            <Name>VoucherCode</Name>
                            <Value>${VoucherCode}</Value>
                        </Property>
                        <Property>
                            <Name>CustomerSatisfaction</Name>
                            <Value>${CustomerSatisfaction}</Value>
                        </Property>
                    </Properties>
                </Objects>
            </CreateRequest>
        </s:Body>
    </s:Envelope>
    `,
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(`Add Record to Data Extension Error: ${response.body}`);
  });
}

/* Defines how to get a refreshed ACCESS_TOKEN */
let getAuthToken = () => {
// Request for a new Auth Token
axios.post(`https://${SUBDOMAIN}.auth.marketingcloudapis.com/v2/token`, {
    
        "grant_type": "client_credentials",
        "client_id": `${CLIENT_ID}`,
        "client_secret": `${CLIENT_SECRET}`,
        "account_id": `${ACCOUNT_ID}` 
    
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  /* .then(function () {
  });  */
} 

/* Gets the Customer Satisfaction Survey feedback and Adds Records */
exports.getCustomerSurveyData = (req, res) => {
  let { EmailAddress, FirstName, LastName, CustomerSatisfaction } = req.body;
  // Dev debug
  console.log(`${EmailAddress} ${FirstName} ${LastName} ${CustomerSatisfaction}`)

  // Generates a random voucher code
  let VoucherCode = voucherGenerator(10);
  console.log(`the voucher code generated is: ${VoucherCode}`);

  // Refreshes the Authorization Token
  getAuthToken();

  // Adds Records to SMC Data Extension Object
  addRecordToDataExtension(
    SUBDOMAIN,
    ACCESS_TOKEN,
    DATA_EXTENSION_KEY,
    EmailAddress,
    FirstName,
    LastName,
    CustomerSatisfaction,
    VoucherCode
  );
  res.send("Customer Survey submited to Salesforce Marketing Cloud");
}