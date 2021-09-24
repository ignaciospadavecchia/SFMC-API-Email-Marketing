axios.post(`https://${SUBDOMAIN}.rest.marketingcloudapis.com/interaction/v1/interactions/`,

  JSON.stringify(  {
    "ContactKey": "ign@tutanota.de",
    "EventDefinitionKey": "APIEvent-38fb1006-d66f-4fef-c6e4-23ffe76ef037",
    "Data": {
      "EmailAddress": `${EmailAddress}`,
      "FirstName": `${FirstName}`,
      "LastName": `${LastName}`,
      "CustomerSatisfaction": `${CustomerSatisfaction}`,
      "VoucherCode": `${VoucherCode}`
    }
  }))
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}