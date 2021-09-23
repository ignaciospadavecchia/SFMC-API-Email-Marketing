/* Requirements */
const voucherGenerator = require("../utils/voucherGenerator");
const request = require("request");
require('dotenv').config();
const {SUBDOMAIN,ACCESS_TOKEN, MONGO_DB, MONGO_HOST} = process.env

var Domain = process.env.SUBDOMAIN;
var Token = process.env.ACCESS_TOKEN;
var DataExtensionKey = process.env.DATA_EXTENSION_KEY;

/* Defines how to Add Records to Salesforce Marketing Cloud Data Extension Object */
function addRecordToDataExtension(
  Domain,
  Token,
  DataExtensionKey,
  EmailAddress,
  FirstName,
  LastName,
  CustomerSatisfaction,
  VoucherCode
) {
   var options = {
    method: "POST",
    url: `https://${Domain}.soap.marketingcloudapis.com/Service.asmx`,
    headers: {
      "Content-Type": "application/json",
    },
    body: `<?xml version="1.0" encoding="UTF-8"?>
\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
    \n
    <s:Header>
        \n
        <a:Action s:mustUnderstand="1">Create</a:Action>
        \n
        <a:To s:mustUnderstand="1">https://${Domain}.soap.marketingcloudapis.com/Service.asmx</a:To>
        \n
        <fueloauth xmlns="http://exacttarget.com">${Token}</fueloauth>
        \n
    </s:Header>
    \n
    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        \n
        <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">
            \n
            <Options />
            \n
            <Objects xsi:type="DataExtensionObject">
                \n
                <PartnerKey xsi:nil="true" />
                \n
                <ObjectID xsi:nil="true" />
                \n
                <CustomerKey>${DataExtensionKey}</CustomerKey>
                \n
                <Properties>
                    \n
                    <Property>
                        \n
                        <Name>EmailAddress</Name>
                        \n
                        <Value>${EmailAddress}</Value>
                        \n
                    </Property>
                    \n
                    <Property>
                        \n
                        <Name>FirstName</Name>
                        \n
                        <Value>${FirstName}</Value>
                        \n
                    </Property>
                    \n
                    <Property>
                        \n
                        <Name>LastName</Name>
                        \n
                        <Value>${LastName}</Value>
                        \n
                    </Property>
                    \n
                    <Property>
                        \n
                        <Name>VoucherCode</Name>
                        \n
                        <Value>${VoucherCode}</Value>
                        \n
                    </Property>
                    \n
                    <Property>
                        \n
                        <Name>CustomerSatisfaction</Name>
                        \n
                        <Value>${CustomerSatisfaction}</Value>
                        \n
                    </Property>
                    \n
                </Properties>
                \n
            </Objects>
            \n
        </CreateRequest>
        \n
    </s:Body>
    \n
</s:Envelope>`,
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(`Add Record to Data Extension Error: ${response.body}`);
  });
}

/* Gets the Customer Satisfaction Survey feedback and Adds Records */
exports.getCustomerSurveyData = (req, res) => {
  let { EmailAddress, FirstName, LastName, CustomerSatisfaction } = req.body;
  // Dev debug
  console.log(`${EmailAddress} ${FirstName} ${LastName} ${CustomerSatisfaction}`)

  // Generates a random voucher code
  let VoucherCode = voucherGenerator(10);
  console.log(`the voucher code generated is: ${VoucherCode}`);

  function getAcessToken() {
    
    
    // everytime theres is a request form the user, 
    // then the access token is required https://{{et_subdomain}}.auth.marketingcloudapis.com/v2/token
    // use the token and use it in the next request
  }

  // Adds Records to SMC Data Extension Object
  addRecordToDataExtension(
    Domain,
    Token,
    DataExtensionKey,
    EmailAddress,
    FirstName,
    LastName,
    CustomerSatisfaction,
    VoucherCode
  );
  res.send("Customer Survey Submited to Salesforce Marketing Cloud");
}