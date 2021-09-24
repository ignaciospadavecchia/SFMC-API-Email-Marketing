const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: data ? { 'Content-Type': 'application/json' } : {}
    }).then(response => {
      if (response.status >= 400) {
        // !response.ok
        return response.json().then(errResData => {
          const error = new Error('Something went wrong!');
          error.data = errResData;
          throw error;
        });
      }
      return response.json();
    });
  };
  
  let getData = () => {
    sendHttpRequest('POST', `https://${SUBDOMAIN}.auth.marketingcloudapis.com/v2/token`, {
        "grant_type": "client_credentials",
        "client_id": `${CLIENT_ID}`,
        "client_secret": `${CLIENT_SECRET}`,
        "account_id": `${ACCOUNT_ID}` 
    })
    .then(responseData => {
      
      console.log(responseData);
    });
  };
  console.log(getData)
  process.env.ACCESS_TOKEN = getData.access_token;
  console.log(process.env.ACCESS_TOKEN)