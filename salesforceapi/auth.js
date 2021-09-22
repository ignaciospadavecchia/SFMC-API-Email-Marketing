var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://mc2hrw9w4dptkls8hvd-wwlct100.auth.marketingcloudapis.com/v2/token',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "grant_type": "client_credentials",
    "client_id": ${ClientID},
    "client_secret": ${ClientSecret},
    "account_id": ${AccountID}
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});