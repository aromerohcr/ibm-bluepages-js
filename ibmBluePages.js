const DOMParser = require('xmldom').DOMParser;
const XMLParser = new DOMParser();
const LDAP = require('ldapjs'); // https://ldapjs.org/client.html
const xpath = require('xpath');
const fetch = require('node-fetch');
const urls = require('./urls');

async function bluePagesQuery(W3ID) {
	return fetch(urls.api + `/mail=${W3ID}.list/byxml`)
		.then(res => res.text())
		.then(str => XMLParser.parseFromString(str))
		.catch((error) => console.error(`Error: ${error}`));
}

function getAttrValue(attrName, xml) {
	let attribute = xpath.select(`//attr[@name='${attrName}']/value`, xml);

	if (attribute.length > 0) {
		return attribute[0].firstChild.data;
	} else {
		return '';
	}
}

async function getDnByW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);
	let nodes = xpath.select('//directory-entries/entry', xml);

	if (nodes.length > 0) {
		return nodes[0].getAttribute('dn');
	} else {
		return null;
	}
}

/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
async function getNameByW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);
	let name = getAttrValue('givenname', xml) + ' ' + getAttrValue('sn', xml); 

	return name;
}

/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
async function getPrimaryUserNameByW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);
	let userName = getAttrValue('primaryuserid', xml);

	return userName.toLowerCase();
}

/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
async function getUIDByW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);
	let uid = getAttrValue('uid', xml); 
    
	return uid;
}

/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
async function getManagerUIDByUserW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);
	let managerUid = getAttrValue('managerserialnumber', xml) + getAttrValue('managercountrycode', xml); 
    
	return managerUid;
}

/**
* @param {String} W3ID
* @returns {Promise<Object>}
*/
async function getUserLocationByW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);

	return {
		buildingName: getAttrValue('buildingname', xml),
		country: getAttrValue('co', xml),
		countryAlphaCode: getAttrValue('c', xml),
		workLocation: getAttrValue('workloc', xml),
		employeeCountryCode: getAttrValue('employeecountrycode', xml)
	};
}

/**
* @param {String} W3ID
* @returns {Promise<boolean>}
*/
async function isManager(W3ID) {
	let xml = await bluePagesQuery(W3ID);
	let flag = getAttrValue('ismanager', xml);
    
	return (flag === 'Y'); // Y: True, N: False...
}

/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
async function getPhoneNumberByW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);
	let phoneNumber = getAttrValue('telephonenumber', xml);
    
	return phoneNumber;
}

/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
async function getJobFunctionByW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);
	let jobFunction = getAttrValue('jobresponsibilities', xml);
    
	return jobFunction;
}

/**
* @param {String} W3ID
* @returns {Promise<string>}
*/
async function getPhotoByW3ID(W3ID) {
	return urls.photo + `/${W3ID}?type=bp`;
}

/**
* @param {String} W3ID
* @returns {Promise<Object>}
*/
async function getUserInformationByW3ID(W3ID) {
	let xml = await bluePagesQuery(W3ID);

	return {
		userName: `${getAttrValue('givenname', xml)} ${getAttrValue('sn', xml)}`,
		userPhoto: urls.photo + `/${W3ID}?type=bp`,
		userJobrespons: getAttrValue('jobresponsibilities', xml),
		userTelephonenumber: getAttrValue('telephonenumber', xml),
		userEmail : getAttrValue('mail', xml),
		buildingName: getAttrValue('buildingname', xml)
	};
}

/**
* @param {String} W3ID
* @param {String} password
* @returns {Promise<boolean>}
*/
async function authenticate(W3ID, password) {
	let dn = await getDnByW3ID(W3ID);

	return new Promise((resolve, reject) => {

		if (dn === null) {
			resolve(false);
		}
        
		let uid = dn.split(/,/)[0].split(/=/)[1];
    
		let opts = {
			filter: '(uid='+ uid +')',
			timeLimit: 500,
			scope: 'sub'
		};

		// * Client for connecting to Bluepages LDAPS interface
		const CLIENT = LDAP.createClient({ url: urls.ldaps });

		CLIENT.bind(dn, password, function (error) {
			if (error) {
				CLIENT.unbind();
				resolve(false);
			} else {
				CLIENT.search('ou=bluepages,o=ibm.com', opts, function(error, res) {
					res.on('searchEntry', function(entry) {
						if(entry.object){
							CLIENT.unbind();
							resolve(true);
						} else {
							CLIENT.unbind();
							resolve(false);
						}
					});

					res.on('error', function(error) {
						CLIENT.unbind();
						resolve(false);
					});
				});
			}
		});
	});
}


module.exports = {
	getNameByW3ID,
	getPrimaryUserNameByW3ID,
	getUIDByW3ID,
	getManagerUIDByUserW3ID,
	getUserLocationByW3ID,
	getPhoneNumberByW3ID,
	getJobFunctionByW3ID,
	getPhotoByW3ID,
	getUserInformationByW3ID,
	authenticate,
	isManager
};