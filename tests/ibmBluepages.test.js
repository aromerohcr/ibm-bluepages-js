const bluePages = require('../ibmBluePages');

test('the result is the full name of the user', async () => {
	const data = await bluePages.getNameByW3ID('aromeroh@cr.ibm.com');
	return expect(data).toBe('Andres Alexander Romero Hernandez');
});

test('the result is an object containing users information', async () => {
	const data = await bluePages.getUserInformationByW3ID('aromeroh@cr.ibm.com');
	return expect(data).toBeDefined();
});

test('the result is the primary username of the user', async () => {
	const data = await bluePages.getPrimaryUserNameByW3ID('aromeroh@cr.ibm.com');
	return expect(data).toBe('aromeroh');
});

test('the login is successful', async () => {
	const success = await bluePages.authenticate('aromeroh@cr.ibm.com', '********');
	return expect(success).toBe(true);
});