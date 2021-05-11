# IBM Bluepages JS

<img alt="David" src="https://img.shields.io/david/rod4n4m1/ibm-bluepages-js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/rod4n4m1/ibm-bluepages-js">
<img alt="npm" src="https://img.shields.io/npm/dm/ibm-bluepages-js">
<img alt="NPM" src="https://img.shields.io/npm/l/ibm-bluepages-js">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/rod4n4m1/ibm-bluepages-js">

This module provides a set of functions to help **IBM** Developers working on internal projects to authenticate and access user directory data available on **IBM Bluepages** using Javascript *promises*.

## Requirements (MacOS/Windows)

* Node.js
  * Minimum: v10.x
  * Recommended: **v12.x**
* npm
  * Tested on: **v6.14.x**
* Python
  * Tested on: **v2.7**

**Note:** Depending on your Windows setup [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) may need to be installed first. Also, for MacOS users, you should have **xcode-select** or entire **Xcode App** package installed.

## Install

```shell
$ npm install ibm-bluepages-js
```

## Uninstall

```shell
$ npm uninstall ibm-bluepages-js
```

## Change Log

This shows only the latest 5 versions.

* `2.1.3`
  * Fixed security vulnerabilities (npm audit fix)
  * hosted-git-info and lodash vulnerabilities

* `2.1.2`
  * Upgraded dependencies and dev environment

* `2.1.1`
  * Updated `node-fetch` to 2.6.1 (Security issue)
  * Upgraded development environment to node v12.x

* `2.1.0`
  * Updated all dependencies to their latest versions
  * Added function `getDirectGlobalReportsByW3ID`
  * Improved `README.md` organization and documentation

* `2.0.14`
  * Fixed lodash < `4.17.19` security vulnerability

* `2.0.12`
  * Updates to functions due to changes on IBM SLAPHAPI
  * Added experimental function `getSlackInfoByW3ID`
  * Added experimental function `getConferenceInfoByW3ID`

* `2.0.11`
  * Major security vulnerability fix on inner dependency.
    * Minimist
  * Minor security vulnerability fix on inner dependency.
    * Bump acorn from `5.7.3` to `5.7.4`
  * Refactored test suite and updated jest.

* `2.0.10`
  * Implemented LDAP calls to IBM ED which brings richer results with slow response time.
  * Added new functions:
    * `getGlobalManagerUIDByW3ID(W3ID)`
    * `getEmployeeInfoByUID(UID)`
    * `getW3IDByUID(UID)`
  * Refactoring of functions and other minor fixes.


## Usage

Perform an action based on location:

```javascript
const bluePages = require('ibm-bluepages-js');

async function doSomethingBasedOnLocation() {
  let location = await bluePages.getEmployeeLocationByW3ID('rod.anami@br.ibm.com');

  if(location.countryAlphaCode === 'br') {
    // if true code
  } else {
    // if else code
  }
}
```

Define a function to return employee information:

```javascript
const bluePages = require('ibm-bluepages-js');

const userProfile = function(id) {
  return bluePages.getEmployeeInfoByW3ID(id).then(function(result){
    return result;
  }).catch(function(error){
    return error;
  });
};
```

Authenticate an account:

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

Render an employee photo with [Express](https://www.npmjs.com/package/express) and [EJS](https://www.npmjs.com/package/ejs):

```javascript
app.get('/profile', async (req, res) => {
  let photo = await bluePages.getPhotoByW3ID('aromeroh@cr.ibm.com');

  res.render('profile.ejs', {
      photo: photo
  });
});
```

```html
<% if (photo) { %>
  <img src="<%= photo %>" alt="User Photo" height="240" width="320">
<% } %>
```

## List of functions available

* `authenticate(W3ID, password)`
* `employeeExists(W3ID)`
* `getConferenceInfoByW3ID(W3ID)`
* `getDirectReportsByW3ID(W3ID)`
* `getDirectAndIndirectReportsByW3ID(W3ID)`
* `getEmployeeInfoByUID(UID)`
* `getEmployeeInfoByW3ID(W3ID)`
* `getEmployeeLocationByW3ID(W3ID)`
* `getEmployeeMobileByW3ID(W3ID)`
* `getEmployeePhoneByW3ID(W3ID)`
* `getGlobalManagerUIDByW3ID(W3ID)`
* `getJobFunctionByW3ID(W3ID)`
* `getManagerUIDByEmployeeW3ID(W3ID)`
* `getNameByW3ID(W3ID)`
* `getPhotoByW3ID(W3ID)`
* `getSlackInfoByW3ID(W3ID)`
* `getUIDByW3ID(W3ID)`
* `getW3IDByUID(UID)`
* `isManager(W3ID)`

### Functions' interfaces

* authenticate(W3ID, password)

```javascript
/**
* @param {String} W3ID
* @param {String} password
* @returns {Promise<boolean>}
*/
```

* employeeExists(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<boolean>}
*/
```

* getConferenceInfoByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

**Note:** it uses the new experimental API

* getDirectReportsByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<Array<Object>>}
*/
```

* getDirectAndIndirectReportsByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<Array<Object>>}
*/
```

* getEmployeeInfoByUID(UID)

```javascript
/**
* @param {String} UID
* @returns {Promise<Object>}
*/
```

* getEmployeeInfoByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<Object>}
*/
```

* getEmployeeLocationByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<Object>}
*/
```

* getEmployeeMobileByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* getEmployeePhoneByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* getGlobalManagerUIDByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* getJobFunctionByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* getManagerUIDByEmployeeW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* getNameByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* getPhotoByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* getSlackInfoByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

**Note:** it uses the new experimental API

* getUIDByW3ID(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* getW3IDByUID(UID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
```

* isManager(W3ID)

```javascript
/**
* @param {String} W3ID
* @returns {Promise<boolean>}
*/
```

## Other Information

### Package security

* It's designed to only work within the IBM Blue Zone network (Secure Network).
* It's designed to use LDAPS as the main authentication method which makes traffic confidential and secure by using Transport Layer Security (TLS).

### Contributing

If you want to contribute to the module and make it better, your help is very welcome. You can do so submitting a **Pull Request**.

### Authors

* Written by Andres Romero <aromeroh@cr.ibm.com>, August 2019.
* Maintainer: Rod Anami <rod.anami@br.ibm.com>
* Contributors: Rod Anami <rod.anami@br.ibm.com>, Holly Cummins <cumminsh@uk.ibm.com>

### License

This project is licensed under the [IBM Public License 1.0](https://opensource.org/licenses/IPL-1.0).
Copyright (c) 2020 IBM
