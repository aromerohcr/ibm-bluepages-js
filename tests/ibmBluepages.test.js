const bluePages = require('../ibmBluePages');

test('the result is the full name of the employee', async () => {
	let data = await bluePages.getNameByW3ID('aromeroh@cr.ibm.com');
	return expect(data).toBe('Andres Alexander Romero Hernandez');
});

test('the result is an object containing employees information', async () => {
	let data = await bluePages.getUserInformationByW3ID('aromeroh@cr.ibm.com');
	return expect(data).toBeDefined();
});
