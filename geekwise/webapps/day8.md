---
layout: webapps
title: Day 8 - Get your swagger on!
permalink: /geekwise/webapps/day8-get-your-swagger-on/
tags: webapps
day: 8
comments: true
---

#Get your swagger on!

Fork the [Swagwise](https://github.com/aaronroberson/swagwise-skeleton) repositority to your local machine.

Change directories to the root of the swagwise application on your local directory.

Run the following commands form the prompt/terminal:

    git fetch
    
    git checkout -b inprogress origin/inprogress
    
The commands above will fetch the remote branches form the repository and switch your local branch to the remote `inprogress` branch.

Run the following command to install the `mongoose` and `bson` dependencies:

    npm install mongoose bson
    
##Start Mongo Service

To start the mongo deamon, open another command/terminal window and run the following command:

    mongod
    
To verify the existence of the swagwise collection we created early in the class, open yet another terminal window and run the following command:

    mongo
    
To view a list of the existing databases, run the `show dbs` command. After verifying the existence of the `swagwise` database, switch to it using the following command:

    use swagwise
   
To verify that you have a `products` collection in the `swagwise` database, run the following command:

    db.getCollectionNames()
    
##Update Mongo connection

Open the server.js file in the root of the swagwise directory and edit line 67 to resemble the following:

    mongoose.connect('mongodb://localhost:27017/swagwise');
    
This will establish a local connection to your mongo instance and the swagwise database.

##Update Swag Model

Open the Swag.js file in the models directory and edit line 23 to resemble the following:

    mongoose.model('Swag', swagSchema, 'products');
    
This tells Mongoose to use a `products` collection but alias it as `Swag` within the mongoose framework.

##Start Application

From the root of the swagwise directory, run the following command to start the application:

    npm start
    
The console will output the host and port that the swagwise application will be running on locally.
