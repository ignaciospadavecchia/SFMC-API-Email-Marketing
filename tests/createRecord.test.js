
 /* Tests */
 test("a POST request status 200 to known Salesforce endpoint", async () => {
    const response = await request.post("https://mc2hrw9w4dptkls8hvd-wwlct100.rest.marketingcloudapis.com/interaction/v1/events");
    expect(response.status).toBe(200);
  });

test("a GET request to unknown Salesforce endpoint", async () => {
   const response = await request.get("https://mc2hrw9w4dptkls8hvd-wwlct100.auth.marketingcloudapis.com/Service.asmx");
   expect(response.status).toBe(404);
  });