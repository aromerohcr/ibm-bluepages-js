<h1> IBM Bluepages JS </h1>
<img alt="David" src="https://img.shields.io/david/aromerohcr/ibm-bluepages-js">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/aromerohcr/ibm-bluepages-js">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/aromerohcr/ibm-bluepages-js">


<p> <b>ibm-bluepages-js</b> helps <b>IBM®</b> Developers working on internal projects that are developed using Nodejs providing an easy tool to authenticate and access directory data available on <b>IBM Bluepages®</b> with Javascript Async/Await functions.</p>

<h3> List of functions </h3>

* `getNameByW3ID(W3ID)`
* `getUIDByW3ID(W3ID)`
* `getManagerUIDByUserW3ID(W3ID)`
* `getUserLocationByW3ID(W3ID)`
* `getPhoneNumberByW3ID(W3ID)`
* `getJobFunctionByW3ID(W3ID)`
* `getPhotoByW3ID(W3ID)`
* `getUserInformationByW3ID(W3ID)`
* `authenticate(W3ID, password)`
* `isManager(W3ID)`

<h3> Code Demo </h3>

<p> We are going use the <b>isManager()</b> function to determine the next action </p>


```javascript

const bluePages = require('ibm-blue-pages');

async function doSomething() {
  let isManager = await bluePages.isManager('aromeroh@cr.ibm.com');
  
  if(isManager) {
    // Perform a manager action
  } else {
    // Perform a regular employee action
  }
}

```

<h3> Download & Installation </h3>

```shell
$ npm i ibm-bluepages-js
```
<h3>What makes this module secure?</h3>
<ul>
  <li>It only works within the IBM Blue Zone (Protected Network).</li>
  <li>It makes use of LDAPS as the main authentication method which makes traffic confidential and secure by using Secure Sockets Layer (SSL).</li>
  <li>It requires a properly formatted certificate which is only available in IBM managed devices.</li>
</ul>

<h3>Contributing</h3>
Ensure that you only fix the thing you’re working on. Do not be tempted to fix some other things that you see along the way, including formatting issues.

<h3>Authors or Acknowledgments</h3>
<ul>
  <li>aromeroh@cr.ibm.com</li>
</ul>

<h3>License</h3>

This project is licensed under the IBM Public License.
Copyright (c) 2015 IBM
