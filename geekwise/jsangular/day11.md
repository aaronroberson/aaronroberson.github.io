---
layout: geekwise
title: Day 10 - HTTPS and Stripe
permalink: /geekwise/jsangular/day-11-https-and-stripe/
tags: geekwise
day: 10
comments: true
---

<h1>Day 10 - HTTPS and Stripe</h1>

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

<p>In the routes.js file, add 'stripe' module as a dependency and pass in your merechant key:</p>

<pre>
stripe       = require('stripe')('your_key_here');
</pre>

Update the '/api/signup' route to create a new stripe user and save their stripe customer id to the database:

{% highlight JavaScript %}
// Create a customer
stripe.customers.create({

    email: email

}, function(err, customer){

    if(err) return next(err);

    var user = new User({
        email: email,
        password: req.body.password,
        customer_id: customer.id
    });

    user.save(function(err) {
        if (err) return next(err);

        res.send(200);
    });

});
{% endhighlight %}

Add the checkout route

{% highlight JavaScript %}
/* ========================= CHECK OUT ROUTES ======================= */
app.route('/api/checkout')
    .post(function(req, res, next) {

        var charge = {
            amount: parseInt(req.body.amount) * 100,
            currency: "usd",
            card: {
                number: parseInt(req.body.number),
                exp_month: parseInt(req.body.month),
                exp_year: parseInt(req.body.year),
                name: req.body.name,
                cvc: parseInt(req.body.cvv),
                customer: req.body.customer_id || null
            }
        };

        stripe.charges.create(charge, function(err, order) {

            if(err) return next(err);

            res.send(order);

        });

    });
{% endhighlight %}

Update the CartService to include the $state dependency and update the checkout function to navigate the user to the checkout state:

{% highlight JavaScript %}
$scope.checkout = function() {
    $state.go('checkout');
};
{% endhighlight %}

Add the checkout controller

{% highlight JavaScript %}
.controller('CheckoutController', function($scope, CartService) {

    // Add a card object to the scope
    $scope.card = {};

    // Add a checkout function
    $scope.checkout = function() {
        // Checkout using CartService
        CartService.checkout($scope.card);

    };

});
{% endhighlight %}

Add the checkout view:

<a href="https://github.com/aaronroberson/swagwise-skeleton/blob/Completed/app/views/checkout.html" target="_blank">checkout html</a>

Add the checkout state:

{% highlight JavaScript %}
.state('checkout', {
    url: '/checkout',
    controller: 'CheckoutController',
    templateUrl: 'views/checkout.html'
})
{% endhighlight %}

<div class="alert alert-info">
    <p>Remember to commit your changes to Github!</p>
</div>
