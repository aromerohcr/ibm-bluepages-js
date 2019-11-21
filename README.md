<h1> IBM Bluepages JS </h1>
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/aromerohcr/ibm-bluepages-js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/aromerohcr/ibm-bluepages-js">
<img alt="npm" src="https://img.shields.io/npm/dm/ibm-bluepages-js">
<img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/aromerohcr/ibm-bluepages-js">
<img alt="NPM" src="https://img.shields.io/npm/l/ibm-bluepages-js">

<p> <b>ibm-bluepages-js</b> helps <b>IBM®</b> Developers working on internal projects that are developed using Nodejs providing an easy tool to authenticate and access directory data available on <b>IBM Bluepages</b> with Javascript Async/Await functions.</p>

<h3> Code Examples </h3>

<p> Perform an action based on location: </p>

```javascript

const bluePages = require('ibm-bluepages-js');

async function doSomethingBasedOnLocation() {
  let location = await bluePages.getUserLocationByW3ID('aromeroh@cr.ibm.com');

  if(location.countryAlphaCode === 'CR') {
    // if true code
  } else {
    // if else code
  }
}

```

<p> Define a function to return user information: </p>

```javascript

const bluePages = require('ibm-bluepages-js');

const userProfile = function(id) {
  return bluePages.getUserInformationByW3ID(id).then(function(result){
    return result;
  }).catch(function(error){
    return error;
  });
};

```

<p> Authenticate an account: </p>

```javascript

const bluePages = require('ibm-bluepages-js');

async function doAccountAuthentication() {
  let success = await bluePages.authenticate('aromeroh@cr.ibm.com', '********');

  if(success) {
    // if true code
  } else {
    // if else code
  }
}

```

<p> Render a user photo with <a href="https://www.npmjs.com/package/express" target="_blank">Express</a> & <a href="https://www.npmjs.com/package/ejs" target="_blank">EJS</a>: </p>

```javascript

app.get('/', async (req, res) => {
  let userPhoto = await bluePages.getPhotoByW3ID('aromeroh@cr.ibm.com');

  res.render('home.ejs', {
      userPhoto: userPhoto
  });
});

```
```html

<% if (userPhoto) { %>
  <img src="<%= userPhoto %>" alt="User Photo" height="240" width="320">
<% } %>

```

<h3> Download & Installation </h3>

```shell
$ npm i ibm-bluepages-js
```

<h3> List of functions </h3>

* `getNameByW3ID(W3ID)`
* `getUIDByW3ID(W3ID)`
* `getPrimaryUserNameByW3ID(W3ID)`
* `getManagerUIDByUserW3ID(W3ID)`
* `getUserLocationByW3ID(W3ID)`
* `getPhoneNumberByW3ID(W3ID)`
* `getJobFunctionByW3ID(W3ID)`
* `getPhotoByW3ID(W3ID)`
* `getUserInformationByW3ID(W3ID)`
* `authenticate(W3ID, password)`
* `isManager(W3ID)`

<h3>What makes this module secure?</h3>
<ul>
  <li>It's designed to only work within the IBM Blue Zone (Secure Network).</li>
  <li>It's designed to use LDAPS as the main authentication method which makes traffic confidential and secure by using Secure Sockets Layer (SSL).</li>
</ul>

<h3>Contributing</h3>
If you want to contribute to the module and make it better, your help is very welcome. Contributing is also a great way to make the module more constructive and efficient.

<h3>License</h3>
This project is licensed under the IBM Public License.
Copyright (c) 2015 IBM
