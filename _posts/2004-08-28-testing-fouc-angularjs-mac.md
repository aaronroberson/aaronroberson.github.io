---
layout: post
title: "Testing FOUC with AngularJS (Mac)"
date: 2014-08-28
author: Aaron Roberson
categories: angularjs
short: Short tutorial on downloading, configuring and using the Network Link Conditioner in Mac to test Flash Of Unstyled Content (FOUC) with AngularJS
comments: true
---

At [OnFarm Systems](http://onfarm.com) we've made it a practice to favor the <code>ng-bind</code> directive over "mustache" (double curly braces) bindings to avoid <abbr title="Flash Of Un-styled Content">FOUC</abbr> in our application. In the agricultural industry it is not uncommon for farmers to access our app over a cellular connection on their touch pad device as they're physically walking through the farm. 

Recently, our development team received a bug and screen capture of one of our widgets with all of it's braces "hanging out". Turns out, the built-in template for the [Angular UI](http://angular-ui.github.io) [NG-Grid](http://angular-ui.github.io/ng-grid/) directive is using the "mustache" binding syntax.

The following steps are the ones I took to reproduce the error on an otherwise decent internet connection.

##Step 1: Clear the cache

Angular somewhat aggressively caches template partials using the [$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache) service. I found that disabling caching (while DevTools is open) was not enough to bust the cache and assist in reproducing the error. In retrospect, I'm giving you the instructions for clearing the file cache history as the first step.

Navigate to [chrome://settings/clearBrowserData](chrome://settings/clearBrowserData) in Chrome. Select "the beginning of time" and check the "Cached images and files" checkbox. Click "Clear browsing data" to clear the cache:
 
<img src="/assets/images/posts/fouc/chrome-clear-cache.png" title="Clear Chrome cache">

##Step 2: Download Hardware IO Tools

If you haven't downloaded and installed [Xcode](https://developer.apple.com/xcode/downloads/), do so now. With Xcode installed, you will need to install the additional Hardware IO tools. Open Xcode, go to Xcode > Open Developer Tool > More Developer Tools. . . select "Hardware IO Tools for Xcode". From the Apple Developers downloads page, select and download the Hardware IO Tools disk image:

![Hardware IO download](/assets/images/posts/fouc/hardware-io-download.png)

##Step 3: Install the Network Link Conditioner

Once you've downloaded the disk image, double click and mount it. Select the Network Link Conditioner.prefPane installer as shown below:

![Hardware IO installation](/assets/images/posts/fouc/hardware-io-dmg.png)

The Network Link Conditioner and link to it in System Preferences will be installed and will automatically open the Network Link Conditioner as shown below:

![Network High Latency](/assets/images/posts/fouc/network-high-latency.png)

##Step 4: Select or create a profile

I wasn't able to reproduce the error using the 3G or network latency profile so I created a custom "Dial-up" profile. Standard Dial-up download speeds are about 52,000 b/s (52K) in perfect laboratory conditions and about 40,000 b/s if you're close to the telephone office. As distance increases, speed decreases. Upload speeds average about 6 Kb/s and I've given a generous packet drop rate of 10%. You can view my profile options below:

![Network Dial-up](/assets/images/posts/fouc/network-custom-dial-up.png)

#Step 5: Turn on the Network Link Conditioner

Using the Dial-up profile was a bit overkill, but it successfully reproduced the FOUC originally reported:

![FOUC](/assets/images/posts/fouc/crop-protection.png)

##Summary

Unfortunately, the Angular UI team has not provided a templated and non-templated version of the NG-Grid directive as they've done with the [UI-Bootstrap](http://angular-ui.github.io/bootstrap/) library. To fix the FOUC, we had to download the unminified source update the templates. A pull-request will follow shortly.