---
layout: geekwise
title: Day 9 - User Authentication
permalink: /geekwise/jsangular/day-9-user-authentication/
tags: geekwise
day: 9
comments: true
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

###Installing dependencies

Run the following command to install the cookieParser and bodyParser modules

    npm install --save cookieParser bodyParser
    
{% highlight JavaScript %}
// Insert in module dependencies

cookieParser  = require('cookie-parser')
bodyParser    = require('body-parser')

// Insert before static reference

// have the ability to simulate DELETE and PUT
app.use(bodyParser.json());
// have the ability to simulate DELETE and PUT
app.use(bodyParser.urlencoded({ extended: true }));
// have the ability to parse cookies
app.use(cookieParser());
{% endhighlight %}


<h3>Adding the Authentication Service</h3>

<p>Update the service.js file to include a new service named 'AuthService':</p>

{% highlight JavaScript %}
(function(angular) {
	"use strict";
 
	var app = angular.module('MyStore');
 
	app.factory('Auth', function($http, $rootScope, $cookieStore) {
 
		$rootScope.currentUser = $cookieStore.get('user');
		$cookieStore.remove('user');
 
		return {
 
			login: function(user, success, error) {
				return $http.post('/api/login', user)
					.success(function(data) {
						$rootScope.currentUser = data;
 
						success();
					})
					.error(error);
			},
 
			signup: function(user, success, error) {
				return $http.post('/api/signup', user)
					.success(success)
					.error(error);
			},
 
			logout: function(success) {
				return $http.get('/api/logout').success(function() {
 
					$rootScope.currentUser = null;
					$cookieStore.remove('user');
 
					success();
				});
			}
		};
 
	});
 
})(window.angular);
{% endhighlight %}

<h3>Adding the AppController</h3>

<p>In the controllers.js file, add an 'AppController' for high-level application functions, such as the logout function:</p>

{% highlight JavaScript %}
app.controller('AppController', function($scope, $state, $timeout, Auth) {
 
 
		function successCallback() {
 
			$state.go('login');
 
			$scope.alert = {
				type: 'success',
				message: 'You have been logged out.'
			};
 
			$timeout(function() {
				$scope.alert = undefined;
 
			}, 3000);
		}
		$scope.logout = function() {
			Auth.logout(successCallback);
		}
 
	});
{% endhighlight %}

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

{% highlight JavaScript %}
(function(angular) {
	"use strict";
 
	var app = angular.module('MyStore', ['ngCookies', 'ngMessages', 'ui.router']);
 
})(window.angular);
{% endhighlight %}

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

{% highlight JavaScript %}
(function(angular) {
	"use strict";
 
	var app = angular.module('MyStore');
 
	app.controller('SignupController', function($scope, $state, $timeout, Auth) {
 
		function successCallback() {
			$scope.alert = {
				type: 'success',
				message: 'Your account has been created.'
			};
 
			$timeout(function() {
 
				$state.go('login');
 
				$scope.alert = undefined;
 
			}, 3000);
		}
 
		function errorCallback() {
			$scope.alert = {
				type: 'danger',
				message: 'There was an error created your account. Please try again.'
			};
 
			$timeout(function() {
				$scope.alert = undefined;
 
			}, 3000);
		}
 
		$scope.signup = function() {
			Auth.signup({
				email   : $scope.email,
				password: $scope.password
			}, successCallback, errorCallback);
		};
	});
 
})(window.angular);
{% endhighlight %}

<p>Update the signup.html in the views directory:</p>

{% highlight JavaScript %}
<div class="row">
	<div class="col-md-4 col-md-offset-4">
		<div class="center-form panel">
			<form method="post" ng-submit="signup()" name="signupForm">
				<div class="panel-body">
					<h2 class="text-center">Sign up</h2>
 
					<div class="alert alert-{{alert.type}}" ng-if="alert" ng-bind="alert.message"></div>
 
					<div class="form-group"
					     ng-class="{ 'has-success' : signupForm.email.$valid && signupForm.email.$dirty, 'has-error' : signupForm.email.$invalid && signupForm.email.$dirty }">
						<input class="form-control input-lg" type="email" id="email"
						       name="email" ng-model="email" placeholder="Email" required
						       autofocus>
 
						<div class="help-block text-danger" ng-if="signupForm.email.$dirty"
						     ng-messages="signupForm.email.$error">
							<div ng-message="required">Your email address is required.</div>
							<div ng-message="email">Your email address is invalid.</div>
						</div>
					</div>
 
					<div class="form-group"
					     ng-class="{ 'has-success' : signupForm.password.$valid && signupForm.password.$dirty, 'has-error' : signupForm.password.$invalid && signupForm.password.$dirty }">
						<input class="form-control input-lg" type="password" name="password"
						       ng-model="password" placeholder="Password" required>
 
						<div class="help-block text-danger"
						     ng-if="signupForm.password.$dirty"
						     ng-messages="signupForm.password.$error">
							<div ng-message="required">Password is required.</div>
						</div>
					</div>
 
					<div class="form-group"
					     ng-class="{ 'has-success' : signupForm.confirmPassword.$valid && signupForm.confirmPassword.$dirty, 'has-error' : signupForm.confirmPassword.$invalid && signupForm.confirmPassword.$dirty }">
						<input class="form-control input-lg" type="password"
						       name="confirmPassword" ng-model="confirmPassword"
						       repeat-password="password" placeholder="Confirm Password"
						       required>
 
						<div class="help-block text-danger my-special-animation"
						     ng-if="signupForm.confirmPassword.$dirty"
						     ng-messages="signupForm.confirmPassword.$error">
							<div ng-message="required">You must confirm password.</div>
							<div ng-message="repeat">Passwords do not match.</div>
						</div>
					</div>
 
					<button type="submit" ng-disabled="signupForm.$invalid"
					        class="btn btn-lg btn-block btn-primary">Create Account
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
{% endhighlight %}

<p>Update the 'signup' state in '/app/states.js' and register the controller and view above on the state.</p>

<h3>Adding the login</h3>

<p>Add the login controller to the 'controllers.js':</p>

{% highlight JavaScript %}
(function(angular) {
 
	var app = angular.module('MyStore');
 
	app.controller('LoginController', function($scope, $state, $timeout, Auth) {
 
		function successCallback() {
			$scope.alert = {
				type: 'success',
				message: 'You have successfully logged in.'
			};
 
			$timeout(function() {
 
				$state.go('home');
 
				$scope.alert = undefined;
 
			}, 3000);
		}
 
		function errorCallback() {
			$scope.alert = {
				type: 'danger',
				message: 'Invalid username and/or password'
			};
 
			$timeout(function() {
				$scope.alert = undefined;
 
			}, 3000);
		}
 
		$scope.login = function() {
 
			Auth.login({
				email: $scope.email,
				password: $scope.password
			}, successCallback, errorCallback);
 
		};
 
	});
 
})(window.angular);
{% endhighlight %}

<p>Update login.html in the views directory:</p>

{% highlight JavaScript %}
<div class="row">
	<div class="col-md-4 col-md-offset-4">
		<div class="center-form panel">
			<div class="panel-body">
				<h2 class="text-center">Login</h2>
 
				<div class="alert alert-{{alert.type}}" ng-if="alert" ng-bind="alert.message"></div>
 
				<form method="post" ng-submit="login()" name="loginForm">
 
					<div class="form-group">
						<input class="form-control input-lg" type="text" name="email"
						       ng-model="email" placeholder="Email" required autofocus>
					</div>
 
					<div class="form-group">
						<input class="form-control input-lg" type="password" name="password"
						       ng-model="password" placeholder="Password" required>
					</div>
 
					<button type="submit" ng-disabled="loginForm.$invalid"
					        class="btn btn-lg btn-block btn-success">Sign In
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
{% endhighlight %}

<p>Update the 'login' state in '/app/states.js' and register the controller and view above on the state.</p>

<h3>Add the User model</h3>
<h3>Add the User model</h3>

<p>Create a new file named User.js in the '/models' directory:</p>

{% highlight JavaScript %}
// Require mongoose dependency
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
 
var userSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	password: String
});
 
var User = mongoose.model('User', userSchema);
 
userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(){}, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});
{% endhighlight %}

<h3>Add API routes</h3>

<p>Add the login and logout API routes to '/routes.js', including the dependency to passport:</p>

{% highlight JavaScript %}
// Add the dependency to passport after the mongoose require declaration
	var passport = require('passport');
 
// Add the following routes after the products routes
// logout API route
	app.get('/api/logout', function(req, res, next) {
		req.logout();
		res.send(200);
	});
 
	// login API route
	app.post('/api/login', passport.authenticate('local'), function(req, res) {
		res.cookie('user', JSON.stringify(req.user));
		res.send(req.user);
	});
 
	// signup API route
	app.post('/api/signup', function(req, res, next) {
		var User = mongoose.model('User');
		var user = new User({
			email: req.body.email,
			password: req.body.password
		});
		user.save(function(err) {
			if (err) return next(err);
			res.send(200);
		});
	});
{% endhighlight %}

<h3>Add Node.js Dependencies</h3>

<p>In the terminal or console, change directories (cd) to the root of the MyStore app and run the following command:</p>
<pre class="prettyprint">
npm install --save express-session passport passport-local bcrypt-nodejs
</pre>

<h3>Add Passport</h3>

<p>Update the server.js file to include the dependencies from above and to configure them:</p>

{% highlight JavaScript %}
// Add the following to the dependencies (after bodyParser)
 
var passport     = require('passport');
var session      = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt-nodejs');
 
// Add the following after the MODELS
 
// ===================== PASSPORT ========================= /
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
	var User = mongoose.model('User');
 
	User.findById(id, function(err, user) {
		done(err, user);
	});
});
 
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
	var User = mongoose.model('User');
 
	User.findOne({ email: email }, function(err, user) {
		if (err) return done(err);
		if (!user) return done(null, false);
 
		function cb(err, isMatch) {
			if (err) return done(err);
			if (isMatch) return done(null, user);
			return done(null, false);
		}
		bcrypt.compare(password, user.password, function(err, isMatch) {
			if (err) return cb(err);
			cb(null, isMatch);
		});
	});
}));
 
// Add the following after express.static in module section
app.use(session({ secret: 'blackwidow straw' }));                       // Encryption key/salt
app.use(passport.initialize());                                         // Initializes passport
app.use(passport.session());                                            // Creates a passport session
 
// Add the following after express.static
app.use(function(req, res, next) {
	if (req.user) {
		res.cookie('user', JSON.stringify(req.user));
	}
	next();
});
{% endhighlight %}

<div class="alert alert-info">
    <p>Remember to commit your changes to Github!</p>
</div>

