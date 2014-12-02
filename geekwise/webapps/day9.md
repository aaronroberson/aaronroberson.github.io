---
layout: webapps
title: Day 8 - RESTful APIs
permalink: /geekwise/webapps/day9-restful-apis/
tags: webapps
day: 9
comments: true
---

#RESTful APIs

##Definitions

Definitions

Here’s a few of the important terms I will use throughout the course of this document:

* Resource: A single instance of an object. For example, an animal.
* Collection: A collection of homogeneous objects. For example, animals.
* HTTP: A protocol for communicating over a network.
* Consumer: A client computer application capable of making HTTP requests.
* Third Party Developer: A developer not a part of your project but who wishes to consume your data.
* Server: An HTTP server/application accessible from a Consumer over a network.
* Endpoint: An API URL on a Server which represents either a Resource or an entire Collection.
* URL Segment: A slash-separated piece of information in the URL.

##Verbs

Surely you know about GET and POST requests. These are the two most commonly requests used when your browser interacts with websites and web applications.

Here are more HTTP methods, referred to as `VERBS` in the context of RESTful APIs:

* GET (SELECT): Retrieve a specific Resource from the Server, or a listing of Resources.
* POST (CREATE): Create a new Resource on the Server.
* PUT (UPDATE): Update a Resource on the Server, providing the entire Resource.
* PATCH (UPDATE): Update a Resource on the Server, providing only changed attributes.
* DELETE (DELETE): Remove a Resource from the Server.

Here are two lesser known HTTP verbs:

* HEAD – Retrieve meta data about a Resource, such as a hash of the data or when it was last updated.
* OPTIONS – Retrieve information about what the Consumer is allowed to do with the Resource.

Typically, GET requests can be cached (and often are!) Browsers, for example, will cache GET requests (depending on cache headers), and will go as far as prompt the user if they attempt to POST for a second time. A HEAD request is basically a GET without the response body, and can be cached as well.

##API Root URL
  
The root location of your API is important, believe it or not. When a developer (read as code archaeologist) inherits an old project using your API and needs to build new features, they may not know about your service at all. Perhaps all they know is a list of URLs which the Consumer calls out to. It’s important that the root entry point into your API is as simple as possible, as a long complex URL will appear daunting and can turn developers away.
  
Here are two common URL Roots (with versioning):
  
* https://example.org/api/v1/*
* https://api.example.com/v1/*

If your application is huge, or you anticipate it becoming huge, putting the API on its own subdomain (e.g. api.) is a good choice. This can allow for some more flexible scalability down the road.

If you anticipate your API will never grow to be that large, or you want a much simpler application setup (e.g. you want to host the website AND API from the same framework), placing your API beneath a URL segment at the root of the domain (e.g. /api/) works as well.

It’s a good idea to have content at the root of your API. Hitting the root of GitHub’s API returns a listing of endpoints, for example. Personally, I’m a fan of having the root URL give information which a lost developer would find useful, e.g., how to get to the developer documentation for the API.

Also, notice the HTTPS prefix. As a good RESTful API, you must host your API behind HTTPS.

##Endpoints
  
An Endpoint is a URL within your API which points to a specific Resource or a Collection of Resources.

If you were building a fictional API to represent several different Zoo’s, each containing many Animals (with an animal belonging to exactly one Zoo), employees (who can work at multiple zoos) and keeping track of the species of each animal, you might have the following endpoints:

* https://api.example.com/v1/zoos
* https://api.example.com/v1/animals
* https://api.example.com/v1/animal_types
* https://api.example.com/v1/employees

When referring to what each endpoint can do, you’ll want to list valid HTTP Verb and Endpoint combinations. For example, here’s a semi-comprehensive list of actions one can perform with our fictional API. Notice that I’ve preceded each endpoint with the HTTP Verb, as this is the same notation used within an HTTP Request header.

* GET /zoos: List all Zoos (ID and Name, not too much detail)
* POST /zoos: Create a new Zoo
* GET /zoos/ZID: Retrieve an entire Zoo object
* PUT /zoos/ZID: Update a Zoo (entire object)
* PATCH /zoos/ZID: Update a Zoo (partial object)
* DELETE /zoos/ZID: Delete a Zoo
* GET /zoos/ZID/animals: Retrieve a listing of Animals (ID and Name).
* GET /animals: List all Animals (ID and Name).
* POST /animals: Create a new Animal
* GET /animals/AID: Retrieve an Animal object
* PUT /animals/AID: Update an Animal (entire object)
* PATCH /animals/AID: Update an Animal (partial object)
* GET /animal_types: Retrieve a listing (ID and Name) of all Animal Types
* GET /animal_types/ATID: Retrieve an entire Animal Type object
* GET /employees: Retrieve an entire list of Employees
* GET /employees/EID: Retreive a specific Employee
* GET /zoos/ZID/employees: Retrieve a listing of Employees (ID and Name) who work at this Zoo
* POST /employees: Create a new Employee
* POST /zoos/ZID/employees: Hire an Employee at a specific Zoo
* DELETE /zoos/ZID/employees/EID: Fire an Employee from a specific Zoo

In the above list, ZID means Zoo ID, AID means Animal ID, EID means Employee ID, and ATID means Animal Type ID. Having a key in your documentation for whatever convention you choose is a good idea.

I’ve left out the common API URL prefix in the above examples for brevity. While this can be fine during communications, in your actual API documentation, you should always display the full URL to each endpoint (e.g. GET http://api.example.com/v1/animal_type/ATID).

Notice how the relationships between data is displayed, specifically the many to many relationships between employees and zoos. By adding an additional URL segment, one can perform more specific interactions. Of course there is no HTTP verb for “FIRE”-ing an employee, but by performing a DELETE on an Employee located within a Zoo, we’re able to achieve the same effect.

##Filtering

Filtering is mostly useful for performing GETs on Collections of resources. Since these are GET requests, filtering information should be passed via the URL. Here are some examples of the types of filtering you could conceivably add to your API:

?limit=10: Reduce the number of results returned to the Consumer (for Pagination)
?offset=10: Send sets of information to the Consumer (for Pagination)
?animal_type_id=1: Filter records which match the following condition (WHERE animal_type_id = 1)
?sortby=name&order=asc: Sort the results based on the specified attribute (ORDER BY name ASC)

Some of these filterings can be redundant with endpoint URLS. For example I previously mentioned GET /zoo/ZID/animals. This would be the same thing as GET /animals?zoo_id=ZID. Dedicated endpoints being made available to the Consumer will make their lives easier, this is especially true with requests you anticipate they will make a lot. In the documentation, mention this redundancy so that Third Party Developers aren’t left wondering if differences exist.

#Status Codes

t is very important that as a RESTful API, you make use of the proper HTTP Status Codes; they are a standard after all! Various network equipment is able to read these status codes, e.g. load balancers can be configured to avoid sending requests to a web server sending out lots of 50x errors. There are a plethora of HTTP Status Codes to choose from, however this list should be a good starting point:

200 OK – [GET]
The Consumer requested data from the Server, and the Server found it for them (Idempotent)
201 CREATED – [POST/PUT/PATCH]
The Consumer gave the Server data, and the Server created a resource
204 NO CONTENT – [DELETE]
The Consumer asked the Server to delete a Resource, and the Server deleted it
400 INVALID REQUEST – [POST/PUT/PATCH]
The Consumer gave bad data to the Server, and the Server did nothing with it (Idempotent)
404 NOT FOUND – [*]
The Consumer referenced an inexistant Resource or Collection, and the Server did nothing (Idempotent)
500 INTERNAL SERVER ERROR – [*]
The Server encountered an error, and the Consumer has no knowledge if the request was successful
Status Code Ranges

The 1xx range is reserved for low-level HTTP stuff, and you’ll very likely go your entire career without manually sending one of these status codes.

The 2xx range is reserved for successful messages where all goes as planned. Do your best to ensure your Server sends as many of these to the Consumer as possible.

The 3xx range is reserved for traffic redirection. Most APIs do not use these requests much (not nearly as often as the SEO folks use them ;), however, the newer Hypermedia style APIs will make more use of these.

The 4xx range is reserved for responding to errors made by the Consumer, e.g. they’re providing bad data or asking for things which don’t exist. These requests should be be idempotent, and not change the state of the server.

The 5xx range is reserved as a response when the Server makes a mistake. Often times, these errors are thrown by low-level functions even outside of the developers hands, to ensure a Consumer gets some sort of response. The Consumer can’t possibly know the state of the server when a 5xx response is received, and so these should be avoidable.

##Expected Return Documents

When performing actions using the different HTTP verbs to Server endpoints, a Consumer needs to get some sort of information in return. This list is pretty typical of RESTful APIs:

GET /collection: Return a listing (array) of Resource objects
GET /collection/resource: Return an individual Resource object
POST /collection: Return the newly created Resource object
PUT /collection/resource: Return the complete Resource object
PATCH /collection/resource: Return the complete Resource object
DELETE /collection/resource: Return an empty document
Note that when a Consumer creates a Resource, they usually do not know the ID of the Resource being created (nor other attributes such as created and modified timestamps, if applicable). These additional attributes are returned with subsequent request, and of course as a response to the initial POST.

Read more [Consumer-Centric API Design](https://github.com/tlhunter/consumer-centric-api-design_
