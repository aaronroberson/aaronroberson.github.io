---
layout: geekwise
title: Day 10 - User Authentication
permalink: /geekwise/day-9-user-authentication/
tags: geekwise
day: 9
---
<h1>Day 9 - User registration and login</h1>

<p>In tonight's class you will:</p>

<ul>
    <li>Create an authentication service</li>
    <li>Add an app controller</li>
    <li>Add Angular Messages for form validation</li>
    <li>Add Angular Cookies for user session management</li>
    <li>Adding user registration:
        <ul>
            <li>Create a sign up controller</li>
            <li>Update the sign up view</li>
            <li>Add sign up API rest point</li>
            <li>Add a sign up state to client-side routes</li>
        </ul>
    </li>
    <li>Adding user login:
        <ul>
            <li>Create a login controller</li>
            <li>Update the login view</li>
            <li>Add a login API rest point</li>
            <li>Add a login state to client-side routes</li>
        </ul>
    </li>
    <li>Creating a User model (mongoose and mongoDB)</li>
    <li>Adding <a href="http://passport.js" target="_blank">Passport</a> for user authentication in Express</li>
</ul>

<h3>Adding the Authentication Service</h3>

<p>Update the service.js file to include a new service named 'AuthService':</p>

{% gist aaronroberson/86391ce601dbaa001bb2 auth-service.js %}

<h3>Adding the AppController</h3>

<p>In the controllers.js file, add an 'AppController' for high-level application functions, such as the logout function:</p>

{% gist aaronroberson/86391ce601dbaa001bb2 app-controller.js %}

<p>Register the controller on the body tag in index.html:</p>

<pre class="prettyprint">
&lt;body ng-controller="AppController"&gt;
</pre>

<h3>Add Angular Messages</h3>

<p>As of Angular 1.3, Angular has added a messages module for simplifying form validation messages.
    Update index.html to include the CDN reference for ngMessages:</p>

<pre class="prettyprint">
&lt;script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.11/angular-messages.min.js"&gt;&lt;/script&gt;
</pre>

<p>Register the ngMessages modules in app.js as a dependencies:</p>

{% gist aaronroberson/86391ce601dbaa001bb2 app.js %}

<h3>Update the navigation</h3>

<p>While you're updating index.html, update the navigation with the logout and current user information:</p>

<pre class="prettyprint">
&lt;ul class="nav navbar-nav pull-right" ng-if="currentUser"&gt;
    &lt;li class="navbar-text" ng-bind="currentUser.email"&gt;&lt;/li&gt;
    &lt;li&gt;
        &lt;a href="javascript:void(0);" ng-click="logout()">Logout&lt;/a&gt;
    &lt;/li&gt;
&lt;/ul&gt;
</pre>

<h3>Adding the sign up</h3>

<p>Add the signup controller in the controllers.js file:</p>

{% gist aaronroberson/86391ce601dbaa001bb2 signup-controller.js %}

<p>Update the signup.html in the views directory:</p>

{% gist aaronroberson/86391ce601dbaa001bb2 signup.html %}

<p>Update the 'signup' state in '/app/states.js' and register the controller and view above on the state.</p>

<h3>Adding the login</h3>

<p>Add the login controller to the 'controllers.js':</p>

{% gist aaronroberson/86391ce601dbaa001bb2 login-controller.js %}

<p>Update login.html in the views directory:</p>

{% gist aaronroberson/86391ce601dbaa001bb2 login.html %}

<p>Update the 'login' state in '/app/states.js' and register the controller and view above on the state.</p>

<h3>Add the User model</h3>

<p>Create a new file named User.js in the '/models' directory:</p>

{% gist aaronroberson/86391ce601dbaa001bb2 User.js %}

<h3>Add API routes</h3>

<p>Add the login and logout API routes to '/routes.js', including the dependency to passport:</p>

{% gist aaronroberson/86391ce601dbaa001bb2 routes.js %}

<h3>Add Node.js Dependencies</h3>

<p>In the terminal or console, change directories (cd) to the root of the MyStore app and run the following command:</p>
<pre class="prettyprint">
npm install --save express-session passport passport-local bcrypt-nodejs
</pre>

<h3>Add Passport</h3>

<p>Update the server.js file to include the dependencies from above and to configure them:</p>

{% gist aaronroberson/86391ce601dbaa001bb2 server.js %}

<div class="alert alert-info">
    <p>Remember to commit your changes to Github!</p>
</div>

<p><a ui-sref="geek.page({page_id: 11})" class="btn btn-default">Continue to Day 11</a></p>

 

<div disqus="'geekwise0109'"></div>