var axios = require('axios');
var data = '<?xml version="1.0" encoding="UTF-8"?>\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\n    <s:Header>\n        <a:Action s:mustUnderstand="1">Create</a:Action>\n        <a:To s:mustUnderstand="1">https://mc2hrw9w4dptkls8hvd-wwlct100.soap.marketingcloudapis.com/Service.asmx</a:To>\n        <fueloauth xmlns="http://exacttarget.com">eyJhbGciOiJIUzI1NiIsImtpZCI6IjQiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiJaV1lZSm9wU3ViWG1uVG5JT2JRc254VXoiLCJjbGllbnRfaWQiOiIwZ2twZmJ6dzVtaHJ4MDBoeXl1azdtN2giLCJlaWQiOjEwMDAwMTY4Nywic3RhY2tfa2V5IjoiUzEwIiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciJ9.eym4NRQcaxg-BU0Oy8SvSMOhOuqZChuFAa_qhOaYJQs.n488bPxs9NSioK5olKTIJi6VA68Q5FJskp9sXx--E4TRq5UDxekpIbHtDqZELuxj1r-vcSOC4bo80NlcAJS15I0plukPxGFEa-L-ItWrJ2OyCIhfDqFhTsnaxvQPzSAcOCoZG5cDUxFeagVBhL_kkal2qfgLVdXrx0cfNf1sNJ7B4uqrkgv</fueloauth>\n    </s:Header>\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n        <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">\n            <Options/>\n            <Objects xsi:type="DataExtensionObject">\n                <PartnerKey xsi:nil="true"/>\n                <ObjectID xsi:nil="true"/>\n                <CustomerKey>NikeCS_Data_Extension</CustomerKey>\n                <Properties>\n                    <Property>\n                        <Name>EmailAddress</Name>\n                        <Value>xoippoudasseitreu-6478@yopmail.com</Value>\n                    </Property>\n                    <Property>\n                        <Name>FirstName</Name>\n                        <Value>Carlos</Value>\n                    </Property>\n                    <Property>\n                        <Name>LastName</Name>\n                        <Value>Doe</Value>\n                    </Property>\n                    <Property>\n                        <Name>VoucherCode</Name>\n                        <Value>LKJHA</Value>\n                    </Property>\n                    <Property>\n                        <Name>CustomerSatisfaction</Name>\n                        <Value>10</Value>\n                    </Property>\n                </Properties>\n            </Objects>\n        </CreateRequest>\n    </s:Body>\n</s:Envelope>';

var config = {
  method: 'post',
  url: 'https://mc2hrw9w4dptkls8hvd-wwlct100.soap.marketingcloudapis.com/Service.asmx',
  headers: { 
    'Content-Type': 'application/xml'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
