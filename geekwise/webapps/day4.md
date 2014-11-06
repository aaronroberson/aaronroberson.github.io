---
layout: webapps
title: Day 4 - Intro to Node.js
permalink: /geekwise/webapps/day4-intro-to-nodejs/
tags: webapps
day: 4
comments: true
---

## Introduction to Node.js

The `N` in `MEAN` stands for Node.js, and can be thought of as a replacement for the `A` in `LAMP`, otherwise known as Apache. The Node.js website describes it as "...a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices." 

In this class, we will be using Node.js to:
 
* Run an HTTP server
* Build out a RESTful API for managing the data within our mongoDB server
* Secure protected routes that require authentication
* Support OAuth credentials for Google, Facebook and Twitter
* More. . .

For a more in-depth overview of Node.js from it's creator, Ryan Dhal, view the following video:

[Ryan Dahl: Node JS](http://youtu.be/EeYvFl7li9E){:target="_blank"}

## Getting Started

[Download Node.js](http://nodejs.org/download/){:target="_blank"} and install it on your system to get started. Let's look at how to create a basic HTTP server in Node.
                                                                                              
First we require the `http` module. The http module is a built-in library of Node. By requiring a module, we can use the code in our application. You might find this familiar to server-side includes, where the included file is a utility library of some sort.

    var http = require('http');

Next, we create the server using the `createServer()` method of the http module:
      
      var server = http.createServer(function(request, response){
        // Read requests, write responses
      });
      
From within the call-back function of `createServer`, we can use the `write()` method of the response to echo back some text to the user:

    response.write('Some text here');
    
To tell the server that the response has completed, call the `end()` method on the response:

     response.end();
     
Because Node (and JavaScript) are non-blocking and asynchronous in nature, the response will remain open until explicitly closed. This makes the use of web sockets and real-time collaboration extremely easy in node (for more on web sockets, check out [socket.io](http://socket.io/){:target="_blank"}).
     
Even though the server was created, it will not run until we tell it which port to run on. Finally, we tell the server what port to listen on:

      server.listen(9001);
      
The `listen` method also accepts a call-back function that will be invoked once the server has successfully started and is listening on the specified port. Within the call-back function, log a message to the command line interface:

    server.listen(9001, function() {
        console.log('Example app listening at http://localhost:9001');
    });
      
##First http server

Create a new file named `app.js` and use the code above to create your first HTTP server. In the response, `write` the message "Hello world".

##NodeMon

Starting and restarting your server is a pain in the ass. If we want to make changes without having to constantly press ctrl + c (or cmd + c for mac) and then issue the command 'node app.js', let's install a package called nodemon.
  
      npm install -g nodemon

Npm stands for [Node Package Modules](https://www.npmjs.org/){:target="_blank"}. The '-g' flag tells your computer to install this package globally. 

Now that we've got nodemon installed, go back to your terminal and type 'nodemon app.js'. Now when you make changes to your code, nodemon will automatically pick those up and you can refresh your browser to see those changes without having to stop and restart your server.

#Express

Express is the `E` in `MEAN` and represents the HTTP framework built on top of Node.js for faster, more robust support of building web servers.

##Getting started with Express

First, create a directory to hold your application, if you haven't already done so, and make that your working directory.

    $ mkdir sandbox
    $ cd sandbox

Create a package.json file in the directory of interest, if it does not exist already, with the npm init command.

    $ npm init
    
Install Express in the app directory and save it in the dependecies list:

    $ npm install express --save
    
To install Express temporarily, and not add it to the dependecies list, omit the --save option:

    $ npm install express

###Basic HTTP server in Express

Here is an example of a very basic Express app.

    var express = require('express')
    var app = express()
    
    app.get('/', function (req, res) {
      res.send('Hello World!')
    });
    
    var server = app.listen(3000, function () {
    
      var host = server.address().address
      var port = server.address().port
    
      console.log('Example app listening at http://%s:%s', host, port)
    
    });
    
Save the code in a file named app.js and run it with the following command.

    $ node app.js
    
Then, load [http://localhost:3000/](http://localhost:3000/){:target="_blank"} in a browser to see the output.

##Resources

[Read-Eval-Print-Loop](http://nodejs.org/api/repl.html){:target="_blank"}

[NPM - Node Package Manager](Cheat sheet http://browsenpm.org/help){:target="_blank"}

[Understanding Module Exports](http://www.sitepoint.com/understanding-module-exports-exports-node-js/){:target="_blank"}

[Front-end Job Interview Questions](https://github.com/darcyclarke/Front-end-Developer-Interview-Questions){:target="_blank"}

Secrets of the JavaScript Ninja by John Resig - [Free book](http://it-ebooks.info/book/2274/){:target="_blank"} [Interactive tutorial=(http://ejohn.org/apps/learn/){:target="_blank"}
