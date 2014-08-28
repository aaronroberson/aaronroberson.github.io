---
layout: geekwise
title: Day 3 - Get your swagger on!
permalink: /geekwise/day-3-get-your-swag-on/
tags: geekwise
day: 3
---

<h1>Day 3 - Get your swagger on!</h1>

<p>In this class you will:</p>
<ul>
    <li>Learn about Single Page Applications (SPA)</li>
    <li>Add UI-router to the application</li>
    <li>Create and configure states</li>
</ul>

<h2>Development dependencies</h2>

<p>
    Throughout this course you will be developing the Swagwise e-commerce application.
    I've created a <a href="https://github.com/aaronroberson/swagwise-skeleton">boilerplate template</a> and have added it to <a href="http://github.com">Github</a>.
    If you don't have one already, you'll be <a href="http://github.com">creating an account</a> and forking the boilerplate template so that you can commit your work to <a href="http://github.com">Github</a>.
</p>

<h3>Install Node.js</h3>
<p>The Swagwise application will be interacting with a database using AJAX (Asynchronous JavaScript and XML).
    In order to overcome XSS (Cross-Site Scripting) limitations in the browser, the application needs to be served up by a web server.
    Rather than installing and setting up Apache and additional server-side software such as Php, Python, or Ruby, the Swagwise application will use Node.js and Express.js as a web server, thereby streamlining the setup process and remaining more relevant to the course topic: JavaScript.</p>
<p>Download and install <a href="http://nodejs.org/">Node.js</a> on your system.</p>

<h4>Install Bower</h4>
<p>Install <a href="http://bower.io">Bower</a> globally (using the <code>-g</code> option) from the command prompt or terminal using the following command:</p>
<pre>npm install -g bower</pre>
<p>The command above will put the grunt command in your system path, allowing it to be run from any directory.</p>

<h3>Install Git</h3>
<p>Download and install <a href="http://git-scm.com/">Git</a>, selecting the option to add the PATH to your system path:</p>
<p class="text-center"><img src="http://f.cl.ly/items/2V2O3i1p3R2F1r2v0a12/mysgit.png" title="Git Setup"></p>

<h3>Install SourceTree</h3>
<p>Download and install <a href="http://www.sourcetreeapp.com/">SourceTree</a>, a Git <abbr title="Graphical User Interface">GUI</abbr> client for Windows or Mac.</p>
<p>
    You will be referencing Angular and other third-party scripts and resources that are hosted on a <abbr title="Content Delivery Network">CDN</abbr>.
    You will also be making <abbr title="Representational state transfer">REST</abbr>ful API calls and will require that our web application is served up in the browser.
    To facilitate this, you will be using <a href="http://nodejs.org">Node.js</a> and <a href="http://expressjs.com">Express</a> to serve up a local instance of the application in the browser.</p>

<h2>Running Express</h2>
<p>In the Windows command prompt or Mac Terminal change (<code>cd [path/to/site/directory]</code>) to the directory you cloned the boilerplate app into and run the following command to add Node middleware registered in package.json:</p>
<pre>npm install</pre>
<p>To start the web server run the following command:</p>
<pre>npm start</pre>
<p>You can now open your browser and go to <a href="http://localhost:9001">http://localhost:9001</a> to access the app.</p>

<h2>Getting Started with AngularJS</h2>
<p>To get started with AngularJS, add the source from the Google CDN:</p>
<pre class="prettyprint lang-html">
&lt;body&gt;
...
&lt;script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.13/angular.min.js">&lt;/script&gt;
&lt;/body&gt;
</pre>
<p>To initialize AngularJS in the app, add the <code>ng-app</code> directive to the html tag:</p>
<pre class="prettyprint lang-html">
&lt;html ng-app&gt;
</pre>

<h2>Adding a module</h2>
<p>As with most applications, you will be needing to configure the Swagwise application when it is initialized.
    In the '/app' directory of the Swagwise application, create an app.js file with the following content:</p>
<pre class="prettyprint lang-javascript">
var app = angular.module('Swagwise', []);
</pre>
<p>Include a reference to the app.js script in the index.html just before the closing body tag:</p>
<pre class="prettyprint lang-html">
&lt;body&gt;
...
&lt;script src="app.js">&lt;/script&gt;
&lt;/body&gt;
</pre>
<p>A module in Angular can be the application itself, or sub-components of the application.
    In the case above, you will be using our 'Swagwise' module for the application.
    Adding the module to our application is as simple as passing the module name to the <code>ng-app</code> directive.</p>
<p>In the index.html page, update ng-app to the following:</p>
<pre class="prettyprint lang-html">
&lt;html ng-app="Swagwise"&gt;
</pre>
<p>Before you move on to configuring our application, let's first address the issue of having added the <code>app</code> variable to the global scope.
    In JavaScript, the default scope for all variables and functions is the global scope, which is the DOM window.
    When developing large applications, you want to limit what you add to the global scope.
    To do that, you are going to use an <abbr title="Immediately Invoked Function Expression">IIFE</abbr>.</p>
<p>Returning to app.js, let's modify it to give our <code>app</code> variable private scope, excluding it form the global scope.</p>
<pre class="prettyprint lang-javascript">
(function(angular) {
var app = angular.module('Swagwise', []);
})(window.angular);
</pre>

<div class="alert alert-info">
    Read more about <a href="http://benalman.com/news/2010/11/immediately-invoked-function-expression/">IIFEs</a>
</div>

<h3>Adding URL Routing</h3>
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
<p>Start by creating a new directory under '/app' and name it 'views'. Now create a new file within the views directory
    and name it 'home.html'. Now, open index.html and edit the page,
    cutting the div item with the jumbotron class as well as the 'Featured Products' html and it's container, then pasting it into '/app/views/home.html'.
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
<p>Finally, update the link in the navigation to use two UI-Router directives named <code>ui-sref</code> and <code>ui-sref-active</code>:</p>
<pre class="prettyprint lang-html">
...
&lt;div class="navbar-header"&gt;
&lt;a class="navbar-brand" ui-sref-active="active"&gt;&lt;img src="assets/images/swagwise-logo.png" alt="Swagwise"&gt;&lt;/a&gt;
&lt;/div&gt;
...
&lt;ul class="nav navbar-nav"&gt;
&lt;li ui-sref-active="active"&gt;
    &lt;a ui-sref="home"&gt;Home&lt;/a&gt;
&lt;/li&gt;
...
&lt;/ul&gt;
</pre>
<p>In your browser, navigate to <a href="http://localhost:9001">http://localhost:9001</a> and the jumbotron should display
    as it did before, except that now it is being injected into the index.html page.</p>
<div class="alert alert-info">In SourceTree, commit your changes and push them to the remote Github repository.</div>

<h2>On your own</h2>

<p>In class, move the rest of the HTML files (excluding index.html) into the '/app/views' directory. Then update the states.js to include the following states:</p>

<table class="table">
    <thead>
        <th>Name</th>
        <th>URL</th>
        <th>template</th>
    </thead>
    <tbody>
        <tr>
            <td>swag</td>
            <td>/swag</td>
            <td>views/swag.html</td>
        </tr>
        <tr>
            <td>about</td>
            <td>/about</td>
            <td>views/about.html</td>
        </tr>
        <tr>
            <td>contact</td>
            <td>/contact</td>
            <td>views/contact.html</td>
        </tr>
        <tr>
            <td>cart</td>
            <td>/cart</td>
            <td>views/cart.html</td>
        </tr>
        <tr>
            <td>login</td>
            <td>/login</td>
            <td>views/login.html</td>
        </tr>
        <tr>
            <td>signup</td>
            <td>/signup</td>
            <td>views/signup.html</td>
        </tr>

    </tbody>
</table>

<div class="alert alert-info">
    <p>Be sure to commit your changes to Github!</p>
</div>

<p><a ui-sref="geek.page({page_id: 4})" class="btn btn-default">Continue to Day 4</a></p>

<hr>

<div disqus="'geekwise0103'"></div>
