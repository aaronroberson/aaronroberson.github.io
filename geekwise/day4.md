---
layout: geekwise
title: Day 4 - Product Listing
permalink: /geekwise/day-4-product-listing/
tags: geekwise
day: 4
comments: true
---

<h1>Day 4 - Swag Product Listing</h1>

<p>In this class you will:</p>
<ul>
    <li>Create a controller for adding products to the swag page</li>
    <li>Fetch the products JSON using AJAX and the $http service</li>
    <li>Use ng-repeat to display the products on the swag page</li>
    <li>Create a service for fetching the products</li>
    <li>Refactor the controller to use the service</li>
    <li>Add search to the swag page using Two-way data binding and filters</li>
</ul>

<h2>Adding the SwagController</h2>
<p>Create a new file in the '/app' directory and name it 'controllers.js'.</p>
<p>Register a new controller on the Swagwise app and name it 'SwagController':</p>

<pre class="prettyprint">
(function(angular) {
"use strict";

var app = angular.module('Swagwise');

app.controller('SwagController', function($scope) {

});

})(window.angular);
</pre>

<p>Update '/app/index.html' to include a reference to the controllers.js file:</p>

<pre class="prettyprint lang-html">
&lt;body&gt;
...
&lt;script src="controllers.js">&lt;/script&gt;
&lt;/body&gt;
</pre>

<p>Finally, update the states.js file to include the SwagController to the swag state:</p>
<pre class="prettyprint lang-javascript">
...
.state('swag', {
url: '/swag',
<strong>controller: 'SwagController',</strong>
templateUrl: 'views/swag.html'
})
...
</pre>

<h2>Adding the JSON data</h2>
<p>Create a new directory in the 'assets' directory and name it 'json'. Now create a new file and name it 'swag.json'.
    Next, copy the following json and paste it into the file you just created:</p>

{% gist aaronroberson/9dee9b49de40302a58d6 swag.json %}

<p>To fetch the data from the JSON file, you are going to use Angular's built-in <a href="https://docs.angularjs.org/api/ng/service/$http" target="_blank">$http</a> service.
    Update the Swagwise controller to include the $http service as a dependency:</p>
<pre class="prettyprint">
(function(angular) {
...

app.controller('SwagController', function($scope, <strong>$http</strong>) {

});

})(window.angular);
</pre>

<p>The $http service using AJAX to communicate with the server and is based upon the <a href="https://docs.angularjs.org/api/ng/service/$q" target="_blank">deferred/promise API</a>.
The return value of the $http function is a promise, and you can use the <code>then</code> method to unwrap the promise in success and error callbacks.
Using the $http.get shortcut method, provide the URL to the swag.json file and in the success callback of the <code>then</code> method add a parameter named 'response'.
    Within the success callback function, assign the data on the response to a <code>swag</code> property of the $scope object:</p>
<pre>
(function(angular) {
...

app.controller('SwagController', function($scope, $http) {

    $http.get('assets/json/swag.json').then(function(response) {

        $scope.swag = response.data;

    });

});

})(window.angular);
</pre>

<h2>Displaying the swag</h2>
<p>Now that the products are available to the swag page, locate the hard-coded HTML for the each product.
    Remove the first three products, then using the <a href="https://docs.angularjs.org/api/ng/directive/ngRepeat" target="_blank">ng-repeat</a> directive update the remaining product to use as the template for the dynamic list:</p>

{% gist aaronroberson/9dee9b49de40302a58d6 swag.html %}

<h2>Adding a service</h2>

<p>Currently, the SwagController is responsible for the AJAX calls for fetching the product information.
    This certainly worked, but it's not very modular or reusable.
    Later you will be adding more components in the Swagwise app that rely on the same data, but with the AJAX requests directly in the controller they would have to be duplicated to additional controllers.
    Code duplicate breaks the DRY (Don't Repeat Yourself) principle.
    In the course you will also be switching from JSON files to using a database, and doing so would require making updates to all the duplicated code throughout the application.</p>

    <p>A more appropriate place to handle the AJAX requests is in a separate object that is available to all parts of the application. To make the code more maintainable, you will create a service object that will be responsible for fetching all of the data related to products.
    Unlike controllers which are instantiated and destroyed frequently, Angular services are singleton objects, meaning they are instantiated once and exist for the life of the application.</p>

<p>Create a new file in the '/app' directory and name it 'services.js':</p>

<pre class="prettyprint">
(function(angular) {
"use strict";

var app = angular.module('Swagwise');

})(window.angular);
</pre>

<p>Now, register a factory service named 'SwagService' on the 'Swagwise' module and declare the $http service as a dependency:</p>

<pre class="prettyprint">
(function(angular) {
"use strict";

var app = angular.module('Swagwise');

app.factory('SwagService', function(<strong>$http</strong>) {

});

})(window.angular);
</pre>

<p>Angular factories return a service object. Using the object literal notation, return an empty object in the SwagService factory:</p>

<pre class="prettyprint">
...
app.factory('SwagService', function($http) {

    <strong>return {

    };</strong>

});
...
</pre>

<p>Next, add a 'swag' method to the returned object and have it return the $http promise:</p>

<pre class="prettyprint">
...
app.factory('SwagService', function($http) {

    return {

        swag: function() {

            return $http.get('assets/json/swag.json');

        }

    };

});
...
</pre>

<h2>Refactoring the controller</h2>

<p>Replace the $http service dependency declaration in the SwagController with the SwagService:</p>

<pre class="prettyprint">
...
app.controller('SwagController', function($scope, <strong>SwagService</strong>) {
    ...
});
...
</pre>

<p>To finish up refactoring the controller, switch the $http.get call with the SwagService.swag method:</p>

<pre class="prettyprint">
...
app.controller('SwagController', function($scope, SwagService) {

    SwagService.swag().then(function(response) {

        $scope.swag = response.data;

    });

});
...
</pre>

<h2>Two-way data binding</h2>
<p>In addition to binding data to the view, the view can also update the data in the controller. This is called two-way data binding.</p>

<p>Update the SwagController, adding an empty object named 'swagSearch' on the $scope:</p>

<pre class="prettyprint">
...
app.controller('SwagController', function($scope, SwagService) {

    $scope.swagSearch = {};
    ...
});
...
</pre>
    <p>Now, update the swag view using Angular's built-in <a href="https://docs.angularjs.org/api/ng/directive/ngModel" target="_blank">ng-model</a> directive to bind the 'swagSearch' object to the input:</p>
<pre class="prettyprint lang-html">
...
&lt;input type=&quot;text&quot; class=&quot;form-control&quot; ng-model=&quot;swagSearch&quot;&gt;
...
</pre>
<p>Bind the 'swagSearch' object to the view by placing the following code after the search input:</p>
<pre class="prettyprint lang-html">
..
&lt;p class=&quot;help-block&quot;&gt;Showing results for &lt;strong ng-bind=&quot;swagSearch&quot;&gt;&lt;/strong&gt;&lt;/p&gt;
..
</pre>
<p>In the browser, type any text into the search form and observe how Angular updates the swagSearch object on the scope and immediately displays the updated value
    in the page where the view object has been bound. This is two-way data binding in action!</p>

<h2>Angular JS Filters</h2>
<p>In order to filter the product listing with the search form, add a filter to the <code>ng-repeat</code> directive that loops through the swag array.
    To create the filter, separate the <code>ng-repeat</code> code with a pipe (|) and specify the filter and arguments:</p>
<pre class="prettyprint lang-html">
...
&lt;div class="col-md-3" ng-repeat="item in swag | filter:swagSearch&quot;&gt;
...
</pre>
<p>Now when you enter text into the search input the product list will filter the products, displaying only the products that have a property with values matching the values in the swagSearch.</p>

<div class="alert alert-info">
<p>Be sure to commit your changes to Github!</p>
</div>
