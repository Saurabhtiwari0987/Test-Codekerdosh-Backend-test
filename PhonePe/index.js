const clientId = "SU2502271932176276613351";
const clientSecret = "291c33a0-8b46-419c-86df-eab339ee76e9";
const clientVersion = "1"; 


const { StandardCheckoutClient, StandardCheckoutPayRequest, OrderStatusResponse, Env } = require('pg-sdk-node');
const env = Env.PRODUCTION;      //change to Env.PRODUCTION when you go live
 
const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

const { randomUUID } = require('crypto');
  
const merchantOrderId = randomUUID();
console.log("orderid", merchantOrderId);
const amount = 100;
const redirectUrl = "https://www.merchant.com/redirect";
  
// const request = StandardCheckoutPayRequest.builder()
//         .merchantOrderId(merchantOrderId)
//         .amount(amount)
//         .redirectUrl(redirectUrl)
//         .build();
  
// client.pay(request).then((response)=> {
//     const checkoutPageUrl = response.redirectUrl;
//     console.log(checkoutPageUrl);
// })


 
// const merchantOrderId = '<merchantOrderId>'; //created at the time of order creation
 
client.getOrderStatus('142d5f7b-2628-4bb3-b9f8-7b0784a20f05').then((response) => {
  const state = response.state;
  console.log(state);
});