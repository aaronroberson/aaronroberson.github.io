---
layout: webapps
title: Day 1 - NoSQL and MongoDB
permalink: /geekwise/webapps/day1-nosql-mongodb/
tags: webapps
day: 1
comments: true
---

#Day 1: NoSQL and MongoDB

##NoSQL 

NoSQL stands for "Not only SQL", meaning that it can be used along side of existing SQL database implementations or replace them completely.

##MongoDB

[MongoDB](http://mongodb.com) is the leading NoSQL database, empowering businesses to be more agile and scalable. To get started with MongoDB, head to the downloads page:

[Download MongoDB](https://www.mongodb.org/downloads)

Next, head to the installation page to get set up:

[Installation Guide](http://docs.mongodb.org/manual/installation/)

##Running

MongoDB contains two executables that you'll be using through the remainder of tonight's class. The server process, `mongod` and `mongo`, the client shell. It is recommended that you add both of these to your environment path. Once you've don so, open a command prompt and enter `mongod` to start a mongoDB server instance. You should see a message printed to the command prompt informing you that the `mongod` service is `waiting for connections on port 27017`.

###Overview

MongoDB is made up of `databases` which contain `collections`. A `collection` is made up of `documents`. Each `document` is made up of `fields`. `Collections` can be `indexed`, which improves lookup and sorting performance. Finally, when we get data from MongoDB we do so through a `cursor` whose actual execution is delayed until necessary.

From another command prompt, you can now launch `mongo` (without the d) which will connect a shell to your running server instance. You should receive a message stating, "Welcome to the MongoDB shell." If you don't see this message, try entering `db.version()`. You should now see the version number you installed, which means everything has been set up correctly and you are ready to start using MongoDB.

###Commands

There are some global commands you can execute, like `help` or `exit`. Commands that you execute against the current database are executed against the `db` object, such as `db.help()` or `db.stats()`. Commands that you execute against a specific collection, are executed against the `db.COLLECTION_NAME` object, such as `db.users.help()` or `db.users.count()`.

    From the `mongo` shell, enter `db.help();` to view a list of commands that you can execute against the `db` object.

There are a number of very useful commands, such as the `db.getMongo()` command, that prints back the connection host (such as 127.0.0.1 or localhost).

    From the `mongo` shell, enter `db.listCommands();` and review the expanded command list and descriptions.
    
To view a list of existing databases for the MongoDB server instance, enter the following command:

    show dbs;

###Databases

By default, the first time you connect to the `mongo` shell, you will be automatically connected to the `test` database. To perform a sanity check at any time, enter `db.getName()` and the name of current database will be displayed.

To switch databases, enter the `use` command followed by the name of the database you would like to switch to. If you enter the name of a non-existing database, the server will temporarily provision a database by the name specified. However, the database will not actually be created until a collection has been created and inserted into the database.

    From the `mongo` shell, enter `use sandbox` to switch to and provision a new database named `sandbox`. The shell will print, "switched to db sandbox".

###Collections and Documents

Similar to databases, inserting new documents into a non-existing collection will result in the creation of the collection specified.

    From the `mongo` shell, enter `db.comedians.insert({name: 'Bill Murray', gender: 'm'});` and hit enter. 
    
    Issue the `db.getCollectionNames()` and hit enter.
    
You should see an array of collection names containing: `"comedians", "system.indexes"`. The collection `system.indexes` is created once per database and contains the information on our database's indexes.
 
The `db.getCollectionNames()` command lists all of the collections in the current database instance. Internally, MongoDB uses a binary serialized JSON format called BSON. Externally, we use JSON for most of our method parameters such as in the case of our insert statement above.

    From the `mongo` shell, insert additional documents into the commedians collection for the following performers:
    
* Jim Carrey, male
* Rodney Dangerfield, male
* Adam Sandler, male
* Wanda Sykes, female

###Query Selectors

A query selector is akin to the SQL `where` clause. As such, you use it when finding, counting, updating and removing documents from collections. A selector is a JSON object, the simplest of which is an empty object literal `{}` (or `null`), which matches all documents.

    From the `mongo` shell, enter `db.comedians.find()` to return a list of all documents in the `comedians` collection. 

Not specifying a query document to the `find()` is equivalent to specifying an empty query document. For instance, `db.comedians.find()` is equal to `db.comedians.find({})`.

To specify equality condition, use the query document `{ field: value }` to select all documents that contain the `field` with the specified `value`.

    Enter `db.comedians.find({name: 'Bill Murray'})
    
The example above retrieves all documents from the `comedians` collection where the `name` field is equal to the string `Bill Murray`.

The `find()` command also accepts a second parameter for limited the fields retrieved.
    
    Enter `db.comedians.find({}, {name: true})
    
The result set will contains the `_id` and `name` fields for all comedians, omitting the `gender` field.

> To learn more about query selectors, view the [Query Documents](http://docs.mongodb.org/manual/tutorial/query-documents/) guide.

A query document can use query operators to specify conditions. For a chart of logical, comparison, array and other query operators view the [Query Selectors](http://docs.mongodb.org/manual/reference/operator/query/#query-selectors) guide. We will discuss these operators in more detail in-class.

###Updates

Updating documents in a collection may seem counter intuitive at first. This is because the the default action of the `db.COLLECTION.update()` command is to replace the matching document with the supplied object. Fundamentally, the `update()` command takes a selector as the first parameter and the values to for applying the update with.

    Enter db.comedians.update({name: 'Jim Carrey'}, {age: 52})
    
    Enter db.comedians.find();
    
You will notice that the document which formerly contained the entry for Jim Carrey is now completely replaced by the document containing the `age` field and the value of 52 as entered previously. To perform an update only on certain fields, without replacing the entire document, use the special `$set` operator.

    Enter db.comedians.update({age:52}, {$set: {name:'Jim Carrey', gender: 'm'}});
    
    
To see that you have successfully updated the document with the additional `name` and `gender` fields (and corresponding values), enter the following command:

    db.comedians.find();

In addition to `$set`, we can leverage other operators to do some nifty things. All update operators work on fields - so your entire document won't be wiped out. For example, the `$inc` operator is used to increment a field by a certain positive or negative amount. 

    Enter db.comedians.update({name: 'Jim Carrey', {$inc: { age: 1}});
    
To observe the age value having been incremented, run the following command:
    
    Enter db.comedians.find({name: 'Jim Carrey'});
    
View the [Update Operators](http://docs.mongodb.org/manual/reference/operator/update/#update-operators) guide on the other available update operators.

> By default, update() will only update a single matching document. To update multiple documents, provide the additional multi parameter: {multi:true}

###Upserts

An `upsert` updates the document if found or inserts it if not. To enable `upserting` we pass a third parameter to update {upsert:true}.

    Enter db.comedians.update({name: 'Will Ferrell', {$set: { age: 47}}, {upsert: true});

When performing the command above, a document with the `name` matching 'Will Ferrell' was not found and was inserted. To check your work, perform a find operation to validate the existence of the `upserted` document.


###Cursor

The `find` command returns a cursor whose execution is delayed until needed. This allows for `method chaining` of additional commands such as:

* sort
* limit
* skip
* count

###Deletes

In MongoDB, the `db.COLLECTION.remove()` method removes documents from a collection. You can remove all documents from a collection, remove all documents that match a condition, or limit the operation to remove just a single document.

To remove all documents from a collection, pass an empty query document {} to the remove() method. 

> The remove() method does not remove the indexes.

To remove the documents that match a deletion criteria, call the remove() method with the `query` parameter.

    Enter db.comedians.remove({age: 53});

###Interactive Tutorial

Complete the interactive tutorial [Mongly](http://mongly.openmymind.net/tutorial/index) created by Karl Sequin.

###Conclusion

In this class we discussed MongoDB databases, collections, documents and CRUD operations. If you have a background in SQL database management you will have noticed certain similarities and definite differences between object-document and relational-database management systems. For more comparisons, please review the [SQL to MongoDB Mapping Chart](http://docs.mongodb.org/manual/reference/sql-comparison/).

In the following class, we will cover indexes, arrays, embedded documents, backups and restore. Advanced techniques such as replication, sharding and MapReduce are out of the scope of this course will not be covered.
