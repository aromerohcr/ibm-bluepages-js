const fetch = require('node-fetch');
const DOMParser = require('xmldom').DOMParser;
const xpath = require('xpath');
const XMLParser = new DOMParser();
const LDAP = require('ldapjs'); // http://ldapjs.org/client.html

// * Client for connecting to Bluepages LDAPS interface
const CLIENT = LDAP.createClient({ url: 'ldaps://bluepages.ibm.com:636' });


// * Each API call to slaphapi will return XML content
async function makeAPICall(W3ID) {
	return await fetch(`https://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/mail=${W3ID}.list/byxml`)
		.then(res => res.text())
		.then(str => XMLParser.parseFromString(str))
		.catch((error) => console.log(`Error occurred: ${error}`));
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
	let xml = await makeAPICall(W3ID);
	let nodes = xpath.select('//directory-entries/entry', xml);

	if (nodes.length > 0) {
		return nodes[0].getAttribute('dn');
	} else {
		return null;
	}
}

/**
* @returns {Promise<string>}
*/
async function getNameByW3ID(W3ID) {
	let xml = await makeAPICall(W3ID);
	let name = getAttrValue('givenname', xml) + ' ' + getAttrValue('sn', xml); 

	return name;
}

/**
* @returns {Promise<string>}
*/
async function getUIDByW3ID(W3ID) {
	let xml = await makeAPICall(W3ID);
	let uid = getAttrValue('uid', xml); 
    
	return uid;
}

/**
* @returns {Promise<string>}
*/
async function getManagerUIDByUserW3ID(W3ID) {
	let xml = await makeAPICall(W3ID);
	let managerUid = getAttrValue('managerserialnumber', xml) + getAttrValue('managercountrycode', xml); 
    
	return managerUid;
}

/**
* @returns {Promise<Object>}
*/
async function getUserLocationByW3ID(W3ID) {
	let xml = await makeAPICall(W3ID);

	return {
		buildingName: getAttrValue('buildingname', xml),
		country: getAttrValue('co', xml),
		countryAlphaCode: getAttrValue('c', xml)
	};
}

/**
* @returns {Promise<boolean>}
*/
async function isManager(W3ID) {
	let xml = await makeAPICall(W3ID);
	let flag = getAttrValue('ismanager', xml);
    
	return (flag === 'Y'); // Y: True, N: False...
}

/**
* @returns {Promise<string>}
*/
async function getPhoneNumberByW3ID(W3ID) {
	let xml = await makeAPICall(W3ID);
	let phoneNumber = getAttrValue('telephonenumber', xml);
    
	return phoneNumber;
}

/* 
* Important! the return value of this function 
* could contain alternative params as Service Line or BU
*/
/**
* @returns {Promise<string>}
*/
async function getJobFunctionByW3ID(W3ID) {
	let xml = await makeAPICall(W3ID);
	let jobFunction = getAttrValue('jobresponsibilities', xml);
    
	return jobFunction;
}

/**
* @returns {Promise<string>}
*/
async function getPhotoByW3ID(W3ID) {
	return `https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/${W3ID}?type=bp`;
}

/**
* @returns {Promise<Object>}
*/
async function getUserInformationByW3ID(W3ID) {
	let xml = await makeAPICall(W3ID);

	return {
		userName: `${getAttrValue('givenname', xml)} ${getAttrValue('sn', xml)}`,
		userPhoto: `https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/${W3ID}?type=bp`,
		userJobrespons: getAttrValue('jobresponsibilities', xml),
		userTelephonenumber: getAttrValue('telephonenumber', xml),
		userEmail : getAttrValue('mail', xml)
	};
}

/**
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

		CLIENT.bind(dn, password, function (error) {
			if (error) {
				CLIENT.unbind();
				resolve(false);
			} else {
				CLIENT.search('ou=bluepages,o=ibm.com', opts, function(error, res) {
					res.on('searchEntry', function(entry) {
						if(entry.object){
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
	getUIDByW3ID,
	getManagerUIDByUserW3ID,
	getUserLocationByW3ID,
	isManager,
	getPhoneNumberByW3ID,
	getJobFunctionByW3ID,
	getPhotoByW3ID,
	getUserInformationByW3ID,
	authenticate
};