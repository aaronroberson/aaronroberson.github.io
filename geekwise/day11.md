---
layout: geekwise
title: Day 11 - HTTPS and Stripe
permalink: /geekwise/day-11-https-and-stripe/
tags: geekwise
day: 11
comments: true
---

<h1>Day 11 - HTTPS and Stripe</h1>

<p>In tonight's class you will:</p>

<ul>
    <li>Create a self-signed certificate</li>
    <li>Enable HTTPS on the Swagwise app</li>
    <li>Create a Stripe account</li>
    <li>Add Stripe integration</li>
</ul>

<h2>Creating a self-signed certificate</h2>

<p>Follow the directions at <a href="https://devcenter.heroku.com/articles/ssl-certificate-self" target="_blank">https://devcenter.heroku.com/articles/ssl-certificate-self</a> to create a self-signed certificate.</p>

<div class="alert alert-info">
    <p>For Windows users, try the following for install SSL: <br>
    <a href="http://www.faqforge.com/windows/use-openssl-on-windows/" target="_blank">http://www.faqforge.com/windows/use-openssl-on-windows/</a></p>
</div>

<h2>Enable HTTPS in Express</h2>

<p>Add the 'http' and 'https' modules to the server.js file as dependencies:</p>

<pre>
http         = require('http');
https        = require('https');
</pre>

<p>Include the self-signed key and certificate and configure the credentials:</p>

<pre>
var privateKey   = fs.readFileSync('cert/server.key', 'utf8');
var certificate  = fs.readFileSync('cert/server.crt', 'utf8');
var credentials  = {key: privateKey, cert: certificate};
</pre>

<p>Configurate the 'http' and 'https' servers:</p>

<pre>
var httpServer   = http.createServer(app);
var httpsServer  = https.createServer(credentials, app);
</pre>

<p>Add an SSL port variable and set it to '8443':</p>

<pre>
var sslport = 8443;
</pre>

<p>Start the 'http' and 'https' servers by setting them to listen on their respective ports:</p>

<pre>
httpServer.listen(port);                                          // startup our app at http://localhost:9001
httpsServer.listen(sslport);                                      // startup our HTTPS server on http://localhost:8443 or :443
</pre>

<h2>Stripe Integration</h2>

<p>From the project root, in the terminal install the stripe module:</p>

<pre>
npm install stripe
</pre>

<p>Go to <a href="http://stripe.com" target="_blank">http://stripe.com</a> and sign up for a FREE account.</p>

<p>In the server.js file, add 'stripe' module as a dependency and pass in your merechant key:</p>

<pre>
stripe       = require('stripe')('your_key_here');
</pre>

<p>After the routes definitions, add the following stripe charge:</p>

<pre>
stripe.charges.create({
amount: 400,
currency: "usd",
card: {
    number: '4242424242424242',
    exp_month: 07,
    exp_year: 2015,
    name: 'BB Thorton',
    "brand": "Visa",
    "funding": "credit",
    "country": "US",
    "address_line1": null,
    "address_line2": null,
    "address_city": null,
    "address_state": null,
    "address_zip": null,
    "address_country": null,
    "cvc_check": null,
    "address_line1_check": null,
    "address_zip_check": null,
    "customer": null
}
}, function(err, charge) {
console.log(charge);
});
</pre>

<div class="alert alert-info">
    <p>Remember to commit your changes to Github!</p>
</div>

<!--p><a ui-sref="geek.page({page_id: 10})" class="btn btn-default">Continue to Day 11</a></p-->

 

<div disqus="'geekwise0111'"></div>