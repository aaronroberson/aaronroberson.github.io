---
layout: webapps
title: Day 10 - RESTful APIs
permalink: /geekwise/webapps/day10-angular-crud/
tags: webapps
day: 10
comments: true
---

#CRUD in AngularJS

In tonight's class we will be looking at basic CRUD operations using Angular and Express. We will code the forms and API calls for user management together, and then you will perform the same tasks individually for product management.

##Role-based authentication

Because we don't want to permit unauthorized users to change sensitive data, we are going to lock down our API routes for authorized admin users.

To begin, we need to fix an error in our existing code. Open server.js from the root of swagwise application and find the passport.use(new LocalStrategy({})) line (approximately line 125). Update the use() method to take a string for the first parameter that is equal to `local` and then update the parameters in the callback to include the `req` object reference:

    passport.use('local', new LocalStrategy({ usernameField : 'email'}, function(req, email, password, done) {
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

Using the local strategy above, Passport will add the user object to every request once an authenticated user has been established.

To understand the program flow of a typical Passport application, read the following blog post:

[Understanding Passport.js Authentication Flow](http://toon.io/understanding-passportjs-authentication-flow/)

Next, we are going to add a checkRole middleware function to the admin-routes.js file that we will use to do our role-based authorization. Edit admin-routes.js by adding the following function after the require statements:

    function checkRole(role) {
		return function(req, res, next) {

			if (req.user && req.user[role]) {
				next();
			} else {
				res.send(401, 'Unauthorized');
			}
		}
	}
	
The function above returns a function that will be used as the callback or middleware function. The `role` parameter is the property on the user object that we want to check against, in our case it will be `isAdmin`.

Next, create a new route that will capture all `/api/admin` API calls such as the one below:

    app.route('/api/admin')
    
Using the `all()` method, register the checkRole middleware on the route above, passing in the `isAdmin` role:

    app.route('/api/admin')
        .all(checkRole('isAdmin'));
        
##Routes to Router Refactor

You may have noticed that in both the routes.js and admin-router.js files we are repeating `/api` and `/api/admin` multiple times. We can clean up our code by using Express' new [Router](http://expressjs.com/4x/api.html#router).

Routers behave like middleware themselves and can be ".use()'d" by the app or in other routers.

In the routes.js and admin-routes.js files, create a new router instance:

    var router = express.Router([options]);
    
Update the references to `app.route` in both files to `router.route`, whilst removing `/api` and `/api/admin`, respectively. To restore the prefixes we've just removed, add the following line to the end of the respective files:

    // router.js
    app.use('/api', router);
    
    // admin-router.js
    app.use('/api', router);
    
##Create Admin User

In the mongo shell, switch to the `swagewise` database (using `use swagewise` command) and then update a document with the `isAdmin` property, like below:

    db.users.update({email:'admin@swagwise.com'}, {$set:{isAdmin:true}});
    
##User CRUD routes
 
We will add CRUD methods to our admin user routes for managing users. You've already mastered listing collection and single documents using Express and Mongoose. Update the users route to return all Users on the response, like so:

    router.route('/users')
        .get(function(req, res) {
            // use mongoose to get all products in the database
            mongoose.model('Product').find({}, function(err, users) {
    
                if (err)
                    res.send(err);
    
                res.send(users); // return products in JSON format
		});
	});
	
Next, update the `users/:id` route to return a single document, like so:
	
	router.route('/users/:id')
	    .get(function(req, res) {
            // use mongoose to get a product in the database by id
            mongoose.model('User').findOne({id: req.params.id}, function (err, product) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);
    
                res.send(product); // return the product in JSON format
        });
    });
    
We have options for how we would like to update and delete documents in our collections. Mongoose provides multiple functions for update and delete operations. Take a look at the [documentation](http://mongoosejs.com/docs/api.html#model_Model) to figure out which methods you would like to use to perform these operations and then add `POST` and `DELETE` verbs to the `/users:id` route to encapsulate this functionality.

##Homework

Your homework this weekend is to go through the following tutorials and complete the following social media OAuth strategies:

1. [Facebook Authentication](http://scotch.io/tutorials/javascript/easy-node-authentication-facebook)
2. [Twitter Authentication](http://scotch.io/tutorials/javascript/easy-node-authentication-twitter)
3. [Facebook Authentication](http://scotch.io/tutorials/javascript/easy-node-authentication-google)
4. [Linking All Accounts Together](http://scotch.io/tutorials/javascript/easy-node-authentication-linking-all-accounts-together)
