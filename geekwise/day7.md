---
layout: geekwise
title: Day 7 - Shopping Cart Part 1
permalink: /geekwise/day-7-shopping-cart-part-1/
tags: geekwise
day: 7
comments: true
---

<h1>Day 7 - Shopping Cart Part 1</h1>

<p>In tonight's class you will be:</p>

<ul>
    <li>Creating Shopping Cart
        <ul>
            <li>Create a cart service</li>
            <li>Create a cart controller</li>
            <li>Add the CartController to the cart state</li>
            <li>Update the cart.html view</li>
        </ul>
    </li>
</ul>

<h2>Cart Service</h2>

<p>Services are the ideal place for encapsulating business logic, formatting data and performing calculations prior to presenting them in the view.</p>

<p>Add a CartService to the services.js file:</p>

{% gist aaronroberson/a26f85400a3e8818a834 cart-service.js %}

<h3>Updating the addItem method</h3>

<p>The addItem method will take an item as a parameter and will check for the existence of the item in the <code>items</code> object.
    If the item doesn't exist, add a <code>quantity</code> property and initialize it with the value of 1.
    Then, add the item to the <code>items</code> object, using the <code>id</code> as its key:</p>
<pre class="prettyprint lang-javascript">
if(!items[item.id]) {
item.quantity = 1;
items[item.id] = item;
}
</pre>

<p>If the item already exists in the <code>items</code> object, increment the quantity property by 1:</p>
<pre class="prettyprint lang-javascript">
else {
items[item.id].quantity += 1;
}
</pre>
<h3>Updating the removeItem method</h3>

<p>The removeItem method will use the built-in Javascript keyword <code>delete</code> to remove the item from the <code>items</code> object:</p>

<pre class="prettyprint lang-javascript">
removeItem: function(id) {
delete items[id];
},
</pre>

<h3>Updating the emptyCart method</h3>

<p>The emptyCart method overrides the <code>items</code> object with an empty object:</p>

<pre class="prettyprint lang-javascript">
emptyCart: function() {
items = {};
},
</pre>

<h3>Updating the getItemCount method</h3>

<p>The getItemCount method returns the total quantity of items in the <code>items</code> object.
    Be careful to use the built-in JavaScript <code>parseInt()</code> function to convert strings to numbers:</p>

<pre class="prettyprint lang-javascript">
getItemCount: function() {
var total = 0;
angular.forEach(items, function(item) {
    total += parseInt(item.quantity);
});
return total;
}
</pre>

<h3>Updating the getCartSubtotal method</h3>

<p>The getCartSubtotal method returns the quantity of items multiplied by the item price or specialPrice (if specialPrice property exists).
    Once again, be sure to use the <code>parseInt()</code> function to ensure that the item quantity is an integer and not a string.
    In addition, use the built-in <code>parseFloat()</code> function to ensure that the item price is a double integer:
</p>

<pre class="prettyprint lang-javascript">
getCartSubtotal: function() {
var total = 0;
angular.forEach(items, function(item) {
   total += parseInt(item.quantity) * parseFloat(item.specialPrice || item.price);
});
return total;
},
</pre>

<h2>Cart Controller</h2>

<p>Add a CartController to the controllers.js file:</p>

{% gist aaronroberson/a26f85400a3e8818a834 cart-controller.js %}

<p>Inject the CartService into the CartController using Angular's built-in dependency injection annotation.
    Then, using the getItems() method, set the items from the CartService in a variable named <code>items</code> on the $scope:
</p>
<pre class="prettyprint lang-javascript">
...
$scope.items = CartService.getItems();
...
</pre>

<p>Next, update each function (addItem, getItemCount, getCartSubtotal, getCartTotal, removeItem, emptyCart and checkout) to invoke the corresponding methods in the CartService. For example:</p>

<pre class="prettyprint lang-javascript">
...
$scope.addItem = function(item) {
// Pass the item into the addItem method of the CartService
CartService.addItem(item);
};
...
</pre>

<p>By design, the controller is very thin, meaning that it is devoid of complex business logic.
    Adding application business logic in the controller is an anti-pattern for several reasons:</p>

<ul>
    <li>Controllers are transient objects, meaning they are created and destroyed frequently</li>
    <li>Controllers are not shared throughout the application, and neither is the code they contain</li>
    <li>Complex controller logic is not easily testable</li>
</ul>

<p>In your applications, aim to make your controllers "anemic", with the sole responsibility of marshalling data from the services and to the view.
    Add the CartController to the 'cart' state of the 'states.js' file.</p>

<div class="alert alert-info">
    <p>Be sure to commit your changes to Github!</p>
</div>
