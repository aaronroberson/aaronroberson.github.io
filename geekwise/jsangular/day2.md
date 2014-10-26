---
layout: geekwise
title: Day 2 - Intro to AngularJS
permalink: /geekwise/jsangular/day-2-intro-to-angularjs/
tags: geekwise
day: 2
comments: true
---

<h1>Day 2 - Intro to AngularJS</h1>

<p>In this class you will get a high-level overview of AngularJS, including:</p>
<ul>
    <li>Initializing Angular</li>
    <li>Two-way data binding</li>
    <li>Angular Scopes</li>
    <li>Controllers</li>
    <li>Modules</li>
    <li>Directives</li>
    <li>Filters</li>
    <li>Services</li>
</ul>

<h2>Slide presentation</h2>

<p><a href="http://slides.com/aaronroberson/angularjs#/" target="_blank" class="btn btn-default">Introduction AngularJS</a></p>

<h2>Exercise: Two-way Data Binding</h2>

<p>Use the following CodePen as a starting point for your first 'Hello World' application using AngularJS:</p>

<p data-height="400" data-theme-id="7721" data-slug-hash="JvLBp" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/aaronroberson/pen/JvLBp/'>JvLBp</a> by Aaron Roberson (<a href='http://codepen.io/aaronroberson'>@aaronroberson</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

<h3>Step 1: Initialize Angular</h3>

<p>In this class you will be using Angular 1.3 (currently Beta 17). You can download Angular from <a href="http://angularjs.org" target="_blank">http://angular.js.org</a> or use the <abbr title="Content Delivery Network">CDN</abbr>.</p>

<p>Before initializing Angular, include the script above in the <code>head</code> or just before the <body>body</body> tag:</p>

<pre class="prettyprint">
...
&lt;script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min.js"&gt;&lt;/script&gt;
...
</pre>

<p>To initialize AngularJS on the page, add the <code>ng-app</code> directive to the <code>html</code> or <code>body</code> tag:</p>

<pre class="prettyprint">
&lt;html ng-app&gt;
</pre>

<p>Two-way data-binding in AngularJS refers to the way in which data is synchronized between the model and the view.
    When the model changes, the view reflects the change, and vice versa.</p>

<img src="http://docs.angularjs.org/img/guide/concepts-databinding1.png">

<div class="alert alert-info">
    Learn more about <a href="http://docs.angularjs.org/guide/databinding" target="_blank">Data-binding</a>
</div>

<h3>Step 2: Add ngModel</h3>

<p>Add Angular's built-in <code>ng-model</code> directive to the form input with the value of 'user.name' as shown below:</p>

<pre class="prettyprint">
...
&lt;input type="text" placeholder="Enter name" class="form-control" ng-model="user.name"&gt;
...
</pre>

<p>In the code above, the <code>ng-model</code> directive creates a user model object on the root scope of the application.
A scope in Angular is a context in which to execute JavaScript expressions, acting as the glue between the application controller and the view.
Scopes are arranged in a hierarchical structure which mimics the DOM structure:</p>

<img src="https://docs.angularjs.org/img/guide/concepts-scope.png">

<div class="alert alert-info">
    Learn more about <a href="http://docs.angularjs.org/guide/scope" target="_blank">Scopes</a>
</div>

<h3>Step 3: Add bindings</h3>

<p>Angular uses the 'mustache' syntax for binding expressions in the view. Alternatively, you can use the built-in <code>ng-bind</code> directive.
Bind the 'name' property of the 'user' object (created by <code>ng-model</code> in the previous step) to the view:</p>

<pre class="prettyprint">
...
&lt;div class="well well-sm"&gt;Hello &lt;strong&gt;&#123;&#123; user.name &#125;&#125;&lt;/strong&gt;&lt;/div&gt;
...
</pre>

<p>Or</p>

<pre class="prettyprint">
...
&lt;div class="well well-sm"&gt;Hello &lt;strong ng-bind="user.name"&gt;&lt;/strong&gt;&lt;/div&gt;
...
</pre>

<div class="alert alert-info">
    <p>Using ng-bind prevents <abbr title="Flash Of Un-styled Content">FOUC</abbr> before Angular is initialized and has a chance to interpolate the expressions and update the <abbr title="Document Object Model">DOM</abbr>.</p>
</div>

<h2>Exercise: Controllers</h2>

<p>A controller is a JavaScript <strong>constructor</strong> function which takes the <code>$scope</code> object as a dependency and is used to synchronize the data between the model and the view.
The controller can also be used to setup or prepare the data for display and must be attached to the DOM via the <code>ng-controller</code>directive.</code>:</p>

<img src="http://docs.angularjs.org/img/guide/concepts-databinding2.png">

<p>Use the following CodePen as a starting point for working with and adding a controller.</p>

<p data-height="300" data-theme-id="7721" data-slug-hash="alquJ" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/aaronroberson/pen/alquJ/'>alquJ</a> by Aaron Roberson (<a href='http://codepen.io/aaronroberson'>@aaronroberson</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

<h3>Step 1: Create the user controller</h3>

<p>Add a <code>script</code> tag just before the closing <code>body</code> tag in the CodePen above. In the script tag, create a function and name it 'UserCtrl':</p>

<pre class="prettyprint">
...
&lt;script&gt;
    function UserCtrl() {

    }
&lt;/script&gt;
...
</pre>

<p>Update the 'UserCtrl' function to include the <code>$scope</code> dependency and then within the function body create a 'user' object on the scope.
    The user object should contain the 'name', 'position', 'company', 'companyLink' and 'skills' properties:</p>

<pre class="prettyprint">
...
&lt;script&gt;
    function UserCtrl(<strong>$scope</strong>) {
        $scope.user = {
            name: 'Aaron Roberson',
            position: 'Software Developer',
            company: 'OnFarm Systems',
            companyLink: 'http://onfarm.com',
            skills: ['HTML5/CSS3', 'JavaScript', 'AngularJS']
        };
    }
&lt;/script&gt;
...
</pre>

<h3>Step 2: Add the controller to the view</h3>

<p>Using the built-in <code>ng-controller</code> directive, add the 'UserCtrl' to the <code>body</code> tag:</p>

<pre class="prettyprint">
...
&lt;body ng-controller="UserCtrl"&gt;
...
</pre>

<h3>Step 3: Bind the 'user' object to the view using the 'mustache' and <code>ng-bind</code> directive:</h3>

<pre class="prettyprint">
...
&lt;h4 class="media-heading" ng-bind="user.name"&gt;&lt;h4&gt;
&lt;h5&gt;&#123;&#123;user.position&#125;&#125; at &lt;a ng-href="&#123;&#123;user.companyLink&#125;&#125;"&gt;&#123;&#123;user.company&#125;&#125;&lt;a&gt;&lt;h5&gt;
&lt;hr style="margin:8px auto"&gt;
&lt;span class="label label-default" ng-repeat="skill in user.skills" ng-bind="skill"&gt;&lt;/span&gt;
...
</pre>

<p>In the code above, the <code>ng-href</code> and <code>ng-repeat</code> built-in directives have been introduced.
The <code>ng-href</code> directive adds the evaluated expression and the <code>href</code> attribute to the anchor tag.
The <code>ng-repeat</code> directive is used to loop through a collection (such as an array or an object) and duplicates the HTML element on each iteration through the collection.
Upon each iteration, a new scope is created and the key or alias and corresponding value is added to the scope.</p>

<div class="alert alert-info">
    Learn more about <a href="http://docs.angularjs.org/guide/controller" target="_blank">Controllers</a>
</div>

<h2>Application modules</h2>

<p>Angular encourages code encapsulation and re-usability through modules. You can think of a module as a container for the different parts of your app &ndash; controllers, services, directives, filters, etc.</p>

<p>Create a module:</p>

<pre class="prettyprint">
// Initialize the module
// The square brackets is an array of
// dependency names that angular's
// dependency injection system uses
// to compose modules of other modules
angular.module('myModule', []);
</pre>

<p>Initialize a module as an application module by passing the name of the module into the ng-app directive on the <code>html</code> tag:</p>

<pre class="prettyprint">
&lt;html ng-app="myModule"&gt;
</pre>

{% gist aaronroberson/c1b0edcf57916813dbe2 module %}

<div class="alert alert-info">
    Learn more about <a href="https://docs.angularjs.org/guide/module" target="_blank">Modules</a>
</div>

<h2>Updating the controller</h2>

<p>Rather than a vanilla JavaScript function, you can register your controllers on the module like in the following example:</p>

{% gist aaronroberson/c1b0edcf57916813dbe2 modular-controller %}
