var request = require('request');

// Access token auth is required every 20 min
var AccessToken =
  "eyJhbGciOiJIUzI1NiIsImtpZCI6IjQiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiJaWjhzYXE3b1ZZcEs4aGF1TW52MVBFd24iLCJjbGllbnRfaWQiOiIwZ2twZmJ6dzVtaHJ4MDBoeXl1azdtN2giLCJlaWQiOjEwMDAwMTY4Nywic3RhY2tfa2V5IjoiUzEwIiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciJ9.DAoZ8if7jVjIy5V1aXuOlZAw9c-tLDop7j3KkoD_xDk.4YqjUhwUrr0UAp3Rb-UnWqYMpZmPSBqB5jmvFHM-qNKFmmscTFohdGTad1xWukWXHcVLTuc5rZhwImzjZJlJ1VrKTNR5Cw1L6zA1tNG-KivzGPeu81nrS-3TqyruPRDKkaEBjG1wHhG4_2O2BPjHsfdA70yim-IA3gDmpl_jXa0gayMvvJ6";

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

exports.request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
