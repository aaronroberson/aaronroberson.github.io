---
layout: webapps
title: Day 7 - Server and client-side Routing
permalink: /geekwise/webapps/day7-server-client-routing/
tags: webapps
day: 7
comments: true
---

<h1>Day 7 - Server and client-side routing</h1>

<p>In this class you will learn about RESTful APIs and creating server and client-side routing.</p>

<h2>Server-side Routing</h2>

<p>Take a moment to re-familiarize yourself with Express routes:</p>

<a href="http://expressjs.com/starter/basic-routing.html" target="_blank">http://expressjs.com/starter/basic-routing.html</a>

    Learn more about the [Express Router](http://expressjs.com/4x/api.html#router)

<h3>REST</h3>

<p>Take a moment in class to read, <a href="http://www.looah.com/source/view/2284" target="_blank">How I Explained REST to My Wife</a></p>.

    Learn more about creating a [RESTful API using Node and Express 4](http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4)

<h3>body-parser</h3>
<p>want to register on entire app because we want entire app to be able to parse JSON and parse the URL.</p>
<p>Install it by typing this command</p>
    
    npm install body-parser

<h2>Client-side URL Routing</h2>
<p>The Swagwise application will be a <abbr title="Single Page Application">SPA</abbr>.
    In short, this means that you 'll have a single index.html page that our other pages (or templates) get injected into.
    At the present time, the official AngularJS routing module is very limited in functionality and plans are underway to update it
    to more reflect the <a href="https://github.com/angular-ui/ui-router">UI-Router</a> currently provided by the <a href="https://angular-ui.github.io/">Angular-UI team.</a></p>
<h4>Bower Package Manager</h4>
<p>You will be using the Bower package manager for installing, updating and maintaining third-party JavaScript libraries.
    From the console or terminal, change directories to the root of the Swagwise application on your local system.
    Before installing any bower components, let's first initialize Bower in our application. In the console or terminal run the following command:</p>
<pre>bower init</pre>
<p>Name your project as 'Swagwise' and accept the defaults for the remaining prompts. When completed, Bower will have created a <code>bower.json</code> file in the root of the application.</p>
<p>Now you are ready to install UI-router. Run the following command:</p>
<pre>bower install --save angular-ui-router</pre>
<p>The <code>--save</code> flag informs bower that you want to update the bower.json file with a reference to the angular-ui-router dependency.
    By default, Bower installs all packages in the bower_components directory. Let's add the UI-Router source to our index page:</p>
<pre class="prettyprint lang-html">
&lt;body&gt;
...
&lt;script src="assets/lib/angular-ui-router/release/angular-ui-router.min.js">&lt;/script&gt;
&lt;script src="app.js">&lt;/script&gt;
&lt;/body&gt;
</pre>
<p>Now you need to register the UI-Router module with the Swagwise module using Angular's Dependency Injection system.
    Let's update <code>app.js</code>:</p>
<pre class="prettyprint lang-javascript">
(function(angular) {
var app = angular.module('Swagwise', ['ui.router']);
})(window.angular);
</pre>
<p>You are now ready to configure the router. To do so, you will add a states.js file to the '/app' directory:</p>
<pre class="prettyprint lang-javascript">
(function(angular) {
var app = angular.module('Swagwise');

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
        .otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: ''
        });

});
})(window.angular);
</pre>
<p>The routing is almost complete. But you may have noticed that the templateUrl property is empty in the configuration above.
    The templateUrl is the path to the html template you want injected into the index.html page.
    But before you can inject a template into the index.html, you first have to specify where in the page you want it inject.
    You do this with a custom directive named <code>ui-view</code> that comes with UI-Router.</p>
 Finally, add and empty <code>div</code> with the <code>ui-view</code> directive in place of the code you previously removed:</p>
<pre class="prettyprint lang-html">
&lt;div ui-view&gt;&lt;/div&gt;
</pre>
<p>Now, update routes.js to include the home.html path in the templateUrl:</p>
<pre class="prettyprint lang-javascript">
...
.state('home', {
url: '/',
templateUrl: 'views/home.html'
})
...
</pre>
