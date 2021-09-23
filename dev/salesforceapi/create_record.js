var request = require("request");
var options = {
  method: "POST",
  url: "https://mc2hrw9w4dptkls8hvd-wwlct100.soap.marketingcloudapis.com/Service.asmx",
  headers: {
    "Content-Type": "application/xml",
  },
  body: `
  <?xml version="1.0" encoding="UTF-8"?>
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
    <s:Header>
        <a:Action s:mustUnderstand="1">Create</a:Action>
        <a:To s:mustUnderstand="1">https://${SubDomain}.soap.marketingcloudapis.com/Service.asmx</a:To>
        <fueloauth xmlns="http://exacttarget.com">${AccessToken}</fueloauth>
    </s:Header>
    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">
            <Options/>
            <Objects xsi:type="DataExtensionObject">
                <PartnerKey xsi:nil="true"/>
                <ObjectID xsi:nil="true"/>
                <CustomerKey>${DataExtensionKey}</CustomerKey>
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
                </Properties>
            </Objects>
        </CreateRequest>
    </s:Body>
</s:Envelope>`,
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
