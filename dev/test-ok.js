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