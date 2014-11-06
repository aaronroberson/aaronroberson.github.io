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
 
** Run an HTTP server<br />
** Build out a RESTful API for managing the data within our mongoDB server<br />
** Secure protected routes that require authentication<br />
** Support OAuth credentials for Google, Facebook and Twitter<br />
** More. . .

For a more in-depth overview of Node.js from it's creator, Ryan Dhal, view the following video:

[Ryan Dahl: Node JS](http://youtu.be/EeYvFl7li9E)

## Getting Started

[Download Node.js](http://nodejs.org/download/) and install it on your system to get started. Let's look at the basic structure of an HTTP server and the steps to create it.
                                                                                              
First we require the `http` module. The http module is a built-in library written by the authors of Node. By requiring it, we can use their code in our application.

    var http = require('http');

Next, we create the server using the `createServer()` method of the http module:
      
      var server = http.createServer(function(request, response){
        // Read requests, write responses
      });
      
Finally, we tell the server what port to listen on:

      server.listen(9001);
      
To respond to the user, we can use the `write()` method of the response:

    response.write('Hello World');
    
To tell the server that the response has completed, call the `end()` method on the response:

     response.end();
      
##First http server

Create a new file named `app.js` and use the code above to create your first HTTP server. In the response, `write` the message "Hello world".

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
    
Then, load [http://localhost:3000/](http://localhost:3000/) in a browser to see the output.

##Resources

[Read-Eval-Print-Loop](http://nodejs.org/api/repl.html)

[NPM - Node Package Manager](Cheat sheet http://browsenpm.org/help)
