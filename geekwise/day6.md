---
layout: geekwise
title: Day 6 - Directives
permalink: /geekwise/day-6-directives/
tags: geekwise
day: 6
---

<h1>Day 6 - Directives</h1>

<p>As you've seen, directives add custom mark-up (such as tags, attributes and CSS class names) that can be used to
    perform DOM manipulation and add custom behavior to HTML.</p>

<p>In this class you will be:</p>
<ul>
    <li>Integrating the UI-Bootstrap module</li>
    <li>Creating a custom directive</li>
    <li>Learning about the Directive Definition Object</li>
    <li>Learning about isolate scopes</li>
</ul>

<p>Throughout this course you've already been exposed to many of Angular's built-in directives such as
    <code>ng-app</code>, <code>ng-controller</code>, <code>ng-bind</code>, <code>ng-repeat</code>,
    <code>ng-model</code> and <code>ng-click</code>. You've also integrated a third-party module, AngularUI
    UI-Router, and the directives included with it: <code>ui-view</code>, <code>ui-sref</code>, and <code>ui-sref-active</code>.
</p> In this class you will be integrating the AngularUI UI-Bootstrap module into the Swagwise application. You will
also be creating a custom directive for displaying product listings.

<h2>Angular-UI UI-Bootstrap</h2>

<p>The Swagwise Application is leveraging the Twitter Bootstrap library for the overall application design. However,
    the
    related Bootstrap JavaScript source has been intentionally left out. Bootstrap's JavaScript is reliant upon
    JQuery
    to perform DOM manipulation imperatively through the use of selectors. Angular, however, takes a declarative
    approach to DOM manipulation through the use of directives. It is advised, therefore, to use directives
    (built-in,
    third-party or custom) to achieve the desired UX behavior. Thankfully, the AngularUI team has re-writted the
    Bootstrap library natively as Angular directives.</p>

<p>On the product detail page, you will be adding a carousel image slider to the product image. To get started, run
    the following Bower command to include the UI-Bootstrap library to the Swagwise project:</p>

<pre>
bower install --save angular-ui-bootstrap-bower
</pre>

<p>To use the UI-Bootstrap library, you need to include a reference to the script in index.html page as well as register the module as an application dependency. UI-Bootstrap comes in two flavors, the script-only source and the templated source. For the Swagwise application you will be using the templated version which has the HTML and CSS compiled with it.</p>

<p>Update index.html to include the script reference:</p>

<pre>
&lt;script src="assets/lib/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js"&gt;&lt;/script&gt;
</pre>

<p>Edit app.js and update the module definition to include the UI-Bootstrap module as a dependency:</p>

<pre>
angular.module('Swagwise', ['ngResource', 'ui.router', <bold>'ui.bootstrap'</bold>]);
</pre>

<p>The UI-Bootstrap module includes the <code>carousel</code> and <code>slide</code> directives needed for creating the carousel. </p>

<div class="alert alert-info">
    <p>Be sure to commit your changes to Github!</p>
</div>

<p><a ui-sref="geek.page({page_id: 7})" class="btn btn-default">Continue to Day 7</a></p>

<hr>

<div disqus="'geekwise0106'"></div>