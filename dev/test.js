const https = require('follow-redirects').https;
const fs = require('fs');

let options = {
  'method': 'POST',
  'hostname': 'mc2hrw9w4dptkls8hvd-wwlct100.soap.marketingcloudapis.com',
  'path': '/Service.asmx',
  'headers': {
    'Content-Type': 'application/xml'
  },
  'maxRedirects': 20
};

const req = https.request(options, (res) => {
  let chunks = [];

  res.on("data", (chunk) => {
    chunks.push(chunk);
  });

  res.on("end", (chunk) => {
    let body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", (error) => {
    console.error(error);
  });
});

let postData =  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:a=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\" xmlns:u=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\n    <s:Header>\n        <a:Action s:mustUnderstand=\"1\">Create</a:Action>\n        <a:To s:mustUnderstand=\"1\">https://mc2hrw9w4dptkls8hvd-wwlct100.soap.marketingcloudapis.com/Service.asmx</a:To>\n        <fueloauth xmlns=\"http://exacttarget.com\">eyJhbGciOiJIUzI1NiIsImtpZCI6IjQiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiJaNk5pdE96M1JLaThBZkZRM3hwU2ZFdEwiLCJjbGllbnRfaWQiOiIwZ2twZmJ6dzVtaHJ4MDBoeXl1azdtN2giLCJlaWQiOjEwMDAwMTY4Nywic3RhY2tfa2V5IjoiUzEwIiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciJ9.wHNwcXfYFI4negYB717RDpebKNv1sEGgbC-qWcpQLlo.sSj4bTU9_VPV1iokXxlAvDw4wNpCJCkawEAUQoDBIPrAMqIn7vQqnz9Hq4nl5PxMaaGcBTVk84z-3qz1KbvSE7YwYy12GM5IDSGa-nmgNNtDyNjfJBvFXD8VKQ9HNXaEdZfTtYHP1lDTVPcTyvgSXanQsmDi8-6bagbtYO--ANirFYXizH9</fueloauth>\n    </s:Header>\n    <s:Body xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n        <CreateRequest xmlns=\"http://exacttarget.com/wsdl/partnerAPI\">\n            <Options/>\n            <Objects xsi:type=\"DataExtensionObject\">\n                <PartnerKey xsi:nil=\"true\"/>\n                <ObjectID xsi:nil=\"true\"/>\n                <CustomerKey>NikeCS_Data_Extension</CustomerKey>\n                <Properties>\n                    <Property>\n                        <Name>EmailAddress</Name>\n                        <Value>xoippoudasseitreu-64@yopmail.com</Value>\n                    </Property>\n                    <Property>\n                        <Name>FirstName</Name>\n                        <Value>Manuel</Value>\n                    </Property>\n                    <Property>\n                        <Name>LastName</Name>\n                        <Value>Doe</Value>\n                    </Property>\n                    <Property>\n                        <Name>VoucherCode</Name>\n                        <Value>LKJHA</Value>\n                    </Property>\n                    <Property>\n                        <Name>CustomerSatisfaction</Name>\n                        <Value>10</Value>\n                    </Property>\n                </Properties>\n            </Objects>\n        </CreateRequest>\n    </s:Body>\n</s:Envelope>";

req.write(postData);

req.end();