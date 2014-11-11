---
layout: webapps
title: Day 5 - Introduction to MVC
permalink: /geekwise/webapps/day5-mvc/
tags: webapps
day: 5
comments: true
---

# Model-View-Controller (MVC)

## Model

To connect to your local database, install the [mongoose ODM](http://mongoosejs.com/){:target="_blank"} module using npm:

    npm install mongoose -g

Read the [Getting started guide](http://mongoosejs.com/docs/index.html) to get familiar with Mongoose and connecting to a local mongo database instance.

## Todo MVC

Let's create a simple Todo app to learn the MVC with Node, Mongoose and Mongo.

### Models

To begin, establish a connection with Mongo using Mongoose:

mongoose.connect('mongodb://localhost/todoapp');

Create a new directory named 'models' and create a Todo.js file in it. Create a simple Schema for a `todo` document:

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var TodoSchema = new Schema({
    	name:String,
    	createdAt:{type:Date,default:Date.now}
    });

    mongoose.model('todo',TodoSchema);


Next, we're going to tell Express that we want to use the Jade template engine to render our views:

app.set('view engine','ejs');

## Views

Install the Jade template engine:

    npm install --save ejs

Create a `views` directory and inside it create an new file, `index.ejs` with the following contents:

    <ul>
        <% todos.forEach(function(todo) { %>
            <li class="todo">
                <span><%=todo.name%></span>
                <input class="edit" data-id="<%=todo.id%>" style="display:none" value="<%=todo.name%>">
            </li>

        <% }); %>
    </ul>

    <form method="post" action="/">
        <input autofocus name="name"/>
        <button type="submit"></button>
    </form>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>

    <script>
        $('.todo').on('dblclick',function(event) {
            var self = $(this),
                input = self.find('input'),
                span = self.find('span');
                span.hide();
                input.show();
        });

        $('.edit').on('blur',function(event) {
            var self = $(this),
                span = self.siblings('span'),
                request = $.ajax({
                    type:"PUT",
                    data:{name:self.val()},
                    url:'/' + self.attr('data-id')
                });
            request.done(function() {
                self.hide();
                span.text(self.val()).show();
            });
        });

    </script>

## Controllers

Create a new directory named controllers and inside it create a file named `todo.js` with the following contents:

    var mongoose = require('mongoose'),
        Todo = mongoose.model('todo'),
        controller = {};

    controller.index = [
        function(req,res,next) {
            //find all todos, render the index.ejs view
            Todo.find({},function(err,todos) {
                if(err) return next(err);
                res.render('todo/index',{todos:todos});
            });
        }
    ];

    controller.create = [
        function(req,res,next) {
            if("name" in req.body && req.body.name !== '') {
                next();
            } else {
                res.send(400);
            }
            //function to validate that the todo isn't empty
        },
        function(req,res,next) {
            //function to create the todo, send back the json of the db object
            Todo.create(req.body,function(err,todo) {
                if(err) return next(err);
                res.redirect("/");
            });
        }
    ];

    controller.update = [
        function(req,res,next) {
            //load todo in question
            Todo.findById(req.param('todoId'),function(err,todo) {
                if(err) return next(err);
                if(!todo) return res.send(404);
                req.todo = todo;
                next();
            });
            //validate that the update doesn't have a blank item
        },
        function(req,res,next) {
            //update todo, send back the new json
            for(key in req.body) {
                req.todo[key] = req.body[key];
            }
            req.todo.save(function(err,todo) {
                res.json(todo);
            });
        }
    ];

    controller.delete = [
        function(req,res,next) {
            //remove document in question. send back 201
        },
    ];

    module.exports = controller;
Because we are going to be doing some CRUD operations over the wire, we need to register the following utilities with our Express app:

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.logger());

Next, register the controllers with the express app:

    app.get('/',todoController.index);
    app.post('/',todoController.create);
    app.put('/:todoId',todoController.update);
    app.del('/:todoId',todoController.delete);

