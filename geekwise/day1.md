---
layout: geekwise
title: Day 1 - JavaScript Objects
permalink: /geekwise/day-1-javascript-objects/
tags: geekwise
day: 1
comments: true
---

#Day 1 - JavaScript Objects

In this class you will:

+ Review JavaScript types
+ Function scope
+ Callbacks and closures
+ Immediately Invoked Function Expressions (IIFE)
+ Constructor functions
+ Object literals
+ JSON (JavaScript Object Notation)

##JavaScript Types

The name 'JavaScript' was decided upon to capitalize on the popularity of Sun Microsystem's Java language, but has very little in common with Java except that both are object-oriented languages.
		The JavaScript syntax is modeled after the Java and C languages, meaning that many of the structures from Java and C apply to JavaScript as well.
		JavaScript has types and operators, core objects and methods. JavaScript types include:

<ul>
    <li><a href="http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/Number" target="_blank" title="Number">Numbers</a></li>
    <li><a href="http://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/String" target="_blank" title="String">Strings</a></li>
    <li><a href="http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean" target="_blank" title="Boolean">Booleans</a></li>
    <li><a href="http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object" target="_blank" title="Object">Objects</a>
        <ul>
            <li><a href="http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function" target="_blank" title="Function">Functions</a></li>
            <li><a href="http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array" target="_blank" title="Array">Arrays</a></li>
            <li><a href="http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date" target="_blank" title="Date">Date</a></li>
            <li><a href="http://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp" target="_blank" title="Regular Expressions">Regular Expressions</a></li>
        </ul>
    </li>
    <li>Null</li>
    <li>Undefined</li>
    <li><a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error" target="_blank" title="Errors">Errors</a></li>
</ul>

##Function scope

Unlike traditional programming languages such as C, JavaScript does NOT have block level scope.
	JavaScript has function scope, meaning that variables defined within a function body are not accessible outside of the function body:

{% highlight JavaScript linenos %}
var x = 10;
function hello() {
	var y = 5;
	console.log(x); // logs 10
}
console.log(y); // throws undefined exception
{% endhighlight %}

In the code above, the variable <code>y</code> which is defined within the function body is not accessible outside of the function.

##Callbacks and closures

A closure in JavaScript provides a convenient way to share function scope between two ore more functions:

{% highlight JavaScript linenos %}
function hello() {
	var y = 5;
	return y;
}
function world(callback) {
	console.log(callback());
}
world(hello); // throws undefined exception
{% endhighlight %}

##Immediately Invoked Function Expressions

In JavaScript, the default scope for all variables and functions is the global scope, which is the DOM <code>window</code>.
		When developing large applications, you should limit what is added to the global scope.
		To do that, you can create a function that immediately invokes itself, otherwise known as an <abbr title="Immediately Invoked Function Expression">IIFE</abbr>:

{% highlight JavaScript linenos %}
(function(){

})();
{% endhighlight %}

##Constructor Functions

Unlike Java and C, JavaScript does not have classes. In JavaScript, functions are objects that can encapsulate executable code and be inherited and extended:

{% highlight JavaScript linenos %}
function Vehicle(make, model, doorCount, color) {
    this.make = make;
    this.model = model;
    this.doors = doorCount;
    this.color = color;
}

var truck = new Vehicle('Toyota', 'Tacoma', 4, 'grey');
{% endhighlight %}

The keyword <code>this</code> inside the function refers to the current object.
		By assigning variables using <code>this</code> you are adding properties to the object that will exist for every instance of the object.

<div class="alert alert-info">
    Learn more about the <code>this</code> keyword, <a href="http://toddmotto.com/understanding-the-this-keyword-in-javascript/" target="_blank">Understanding the 'this' keyword in JavaScript</a>
</div>

The <code>new</code> operator creates an instance of a user-defined object type or of one of the built-in object types that has a constructor function.

<div class="alert alert-info">
    Learn more about the <code>new</code> operator on the <a href="http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new" target="_blank">Mozilla Developer Network</a>
</div>

{% highlight JavaScript linenos %}
var truck = new Vehicle('Toyota', 'Tacoma', 4, 'grey');
console.log(truck.model); // Outputs Tacoma
var car = new Vehicle('Honda', 'Accord', 2, 'white');
console.log(car.model); // Outputs Honda
{% endhighlight %}

##Object literals

JavaScript objects, particularly object literals, can be thought of as collections of name-value pairs which are similar to:

+ Dictionaries in Python
+ Hashes in Perl and Ruby
+ Hash tables in C and C++
+ HashMaps in Java
+ Associative arrays in PHP

The name (in name-value pair) consists of a JavaScript string, while the value can be any JavaScript value. For example:

{% highlight JavaScript linenos %}
var Vehicle = {
    make: 'Toyota',
    model: 'Tacoma',
    doors: 4,
    color: 'grey',
	startEngine: function() {
		this.engine = 'running';
	}
};
{% endhighlight %}

Once an Object literal has been created, it's properties can be accessed in one of two ways. The first is the 'dot' notation:

<pre class="prettyprint">
var manufacturer = Vehicle.make;
</pre>

Or through the 'array' or 'bracket' notation:

<pre class="prettyprint">
var manufacturer = Vehicle['make'];
</pre>

The advantage of the 'dot' notation is that is it convenient and easy to read. However, the advantage of the 'bracket' notation is that the string can be calculated at run-time which is helpful when looping through properties of an array or escaping <a href="https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words" target="_blank">reserved words</a>:

<pre class="prettyprint">
obj.for = "Aaron"; // Syntax error, because 'for' is a reserved word
obj["for"] = "Aaron"; // works fine
</pre>

##JSON

JSON is a data-interchange format akin to XML and SOAP. Unlike XML and SOAP, it is extremely light-weight and is based upon Object literals in Javascript.

<div class="alert alert-info">
    Learn more about JSON at <a href="http://json.org" target="_blank">http://json.org</a>
</div>

<a ui-sref="geek.page({page_id: 2})" class="btn btn-default">Continue to Day 2</a>

 

<div disqus="'geekwise0101'"></div>

