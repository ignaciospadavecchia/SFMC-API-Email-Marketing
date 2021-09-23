var request = require('request');

// Access token auth is required every 20 min
var AccessToken = ACCESS_TOKEN

var options = {
  'method': 'POST',
  'url': 'https://mc2hrw9w4dptkls8hvd-wwlct100.auth.marketingcloudapis.com/v2/token',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "grant_type": "client_credentials",
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "account_id": ACCOUNT_ID
  })

};

exports.request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
