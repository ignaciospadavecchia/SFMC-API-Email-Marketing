var options = {
    method: "POST",
    url: `https://${SUBDOMAIN}.soap.marketingcloudapis.com/Service.asmx`,
    headers: {
      "Content-Type": "application/xml",
    },
    body: `<?xml version="1.0" encoding="utf-8"?>
    <s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
  
        <s:Header>
            <a:Action s:mustUnderstand="1">Create</a:Action>
            <a:To s:mustUnderstand="1">https://${SUBDOMAIN}.soap.marketingcloudapis.com/Service.asmx</a:To>
            <fueloauth xmlns="http://exacttarget.com">${AccessToken}</fueloauth>
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