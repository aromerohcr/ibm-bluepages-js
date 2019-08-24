const bluePages = require('../ibmBluePages');

test('the result is the full name of the user', async () => {
	let data = await bluePages.getNameByW3ID('aromeroh@cr.ibm.com');
	return expect(data).toBe('Andres Alexander Romero Hernandez');
});

test('the result is an object containing users information', async () => {
	let data = await bluePages.getUserInformationByW3ID('aromeroh@cr.ibm.com');
	return expect(data).toBeDefined();
});

test('the result is the primary username of the user', async () => {
	let data = await bluePages.getPrimaryUserNameByW3ID('aromeroh@cr.ibm.com');
	return expect(data).toBe('aromeroh');
});