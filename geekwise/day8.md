---
layout: geekwise
title: Day 8 - Shopping Cart Part 2
permalink: /geekwise/day-8-shopping-cart-part-2/
tags: geekwise
day: 8
---

<h1>Day 8 - Shopping Cart Part 2</h1>

<p>In tonight's class you will be:</p>

<ul>
    <li>Creating a mini-shopping cart directive</li>
    <li>Create an add to cart button directive</li>
    <li>Learn about Angular's $cookieStore</li>
    <li>Update CartService to persist items to cookie</li>
    <li>Update CartService to retrieve items from cookie</li>
</ul>

<h2>Mini-cart directive</h2>

<p>Add a miniCart directive to the directives.js file:</p>

{% highlight JavaScript linenos %}
(function(angular) {
	"use strict";
 
	var app = angular.module('Swagwise');
 
	// Inject in the CartService
	app.directive('miniCart', function() {
 
		return {
			// Create an isolated scope
			scope: {
			},
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/mini-cart.html',
			link: function(scope, elem, attr) {
 
				scope.getCartSubtotal = function() {
					// Returns subtotal from CartService
				};
 
				scope.getItemCount = function() {
					//Returns the item count from the CartService
				};
			}
 
		};
	});
 
})(window.angular);
{% endhighlight %}

<p>Update the getCartSubtotal and getItemCount functions on the scope to return respective values using the getCartSubtotal and getItemCount methods on the cartService.</p>

<p>Add a mini-cart template to the 'templates' directory:</p>

{% gist aaronroberson/a26f85400a3e8818a834 mini-cart.html %}

<h3>Creating an "Add to Cart" directive</h3>

<p>Create a new directive and name it 'addCartButton' (in the directives.js file).
    Next, inject the CartService into the directive using Angular's built-in dependency injection annotations.
    The directive will have the following properties:</p>
<ul>
    <li>Restrict the directive for use as an element</li>
    <li>An isolated scope that accepts a product object (using two-way data binding)</li>
    <li>Specify a templateUrl path of 'templates/add-cart-button.html'</li>
    <li>Add an addItem method on the scope (using the link function) and set it equal to the CartService addItem method</li>
</ul>
<p>The completed code should resemble the following:</p>

{% highlight JavaScript linenos %}
(function(angular) {
	"use strict";
	
	var app = angular.module('Swagwise');
	
	// Inject the CartService
	app.directive('addCartButton', function() {
	
		return {
			// E for Element
			// A for Attribute
			// C for Class
			restrict: 'E',
			scope: {
				// 3 types of bindings for scope properties
				// @ which is a string
				// & which is a one-way binding
				// = which is two-way binding
			},
			replace: true,
			templateUrl: 'templates/add-cart-button.html',
			link: function(scope, elem, attr) {
				
				scope.addItem = function(item) {
					// Pass the item into the addItem method of the CartService
				};
			}
		
		};
	});
 
})(window.angular);
{% endhighlight %}

<p>Inject the CartService into the AddCartButton directive. Add the item to the scope using the two-way binding syntax and update the addItem function on the scope to use the CartService.</p>

<p>Next, create the 'add-cart-button.html' template in the 'app/templates/' directory. Add the following HTML markup:</p>

    <button class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Add to cart</button>

<p>Update the button using the 'ng-click' directive to call the addItem method of the AddCartButton directive, passing the the item to be added to the cart.</p>

<p>Update the product-group.html by removing the place-holder add cart link with the directive above. Also, update the detail.html view to use the add-cart button.</p>

<h3>Update the cart.html view</h3>

<p>Within the div with the 'col-mm-12' class (and before the cart table), add an alert message that is only displayed when the shopping cart is empty:</p>

<pre class="prettyprint lang-html">
&lt;div class=&quot;alert alert-warning&quot; ng-show=&quot;!getItemCount()&quot;&gt;
&lt;p&gt;There are no items in your cart
    &lt;a ui-sref=&quot;swag&quot; class=&quot;btn btn-default&quot;&gt;
        &lt;i class=&quot;glyphicon glyphicon-shopping-cart&quot;&gt;&lt;/i&gt; Continue Shopping
    &lt;/a&gt;
&lt;/p&gt;
&lt;/div&gt;
</pre>

<p>Next, add an <code>ng-show</code> directive to the cart table and using the getItemCount method as the evaluated expression:</p>

<pre class="prettyprint lang-html">
&lt;table class="table table-hover" ng-show="getItemCount()"&gt;
</pre>

<p>Update the cart.html view so that the items in the items object on the scope are looped over and repeated in the view:</p>

<pre class="prettyprint lang-html">
<!-- repeat of the items in the cart -->
&lt;tr ng-repeat="item in items"&gt;
</pre>

<p>Update the HTML by binding the properties of each item to the cart items listing.
    Using the ng-click directives, update the remove item, empty cart and checkout buttons to use the corresponding functions on the scope in the CartController.
Using the 'ui-sref' directive, update the continue shopping button to link to the swag state.</p>

<h2>Adding $cookieStore dependency</h2>

<p>Include the CDN reference to the angular-cookies script in the index.html page:</p>

<pre class="prettyprint">
&lt;script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.11/angular-cookies.min.js"&gt;&lt;/script&gt;
</pre>

<p>Register the new ngCookies module in app.js as a dependency:</p>

<pre class="prettyprint">
var app = angular.module('Swagwise', ['ngResource', <strong>'ngCookies'</strong>, 'ui.router', 'ui.bootstrap']);
</pre>

<h2>Updating the CartService</h2>

<p>To include the dependency to the CartService inject the $cookieStore service using Angular's dependcey injection annotation:</p>
<pre class="prettyprint lang-javascript">
app.factory('CartService', function(<strong>$cookieStore</strong>) {
</pre>

<p>Update the 'updateItemsCookie' function to update the 'items' cookie each time the 'items' object is updated.
    Unlike arrays in JavaScript, you cannot <code>push</code> items onto an existing cookie.
    To keep the items cookie updated when new items are added, updated or removed from the cart, you will call this function to destroy the existing cookie and rebuild it:
</p>

{% gist aaronroberson/0f8e21ee45eb11e5d589 updateItemsCookie %}

<h2>Update getItems method</h2>

<p>Update the getItems method to look for the items cookie if the cart is empty. If the items cookie exists, rebuild the cart by looking up the product by the id stored in the cookie:</p>

{% gist aaronroberson/0f8e21ee45eb11e5d589 getItems %}

<p>When looping through the itemsCookie the SwagService is being called to fetch the details for each object.
    In order for this to work, you must first inject the SwagService into the CartService:</p>

<pre class="prettyprint lang-javascript">
app.factory('CartService', function($cookieStore, <strong>SwagService</strong>) {
</pre>

<h2>Update the emptyCart method</h2>

{% gist aaronroberson/0f8e21ee45eb11e5d589 emptyCart %}

<div class="alert alert-info">
    <p>Be sure to commit your changes to Github!</p>
</div>

<p><a ui-sref="geek.page({page_id: 9})" class="btn btn-default">Continue to Day 9</a></p>

<hr>

<div disqus="'geekwise0108'"></div>