const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		var from = 'example@example.com';
		var text = 'Sample message';
		var res = generateMessage(from, text);
		expect(res.from).toBe(from);
		expect(res.text).toBe(text);
		expect(res.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'example@example.com';
		var lat = 81;
		var lng = 88;
		var res = generateLocationMessage(from, lat, lng);
		expect(res.from).toBe(from);
		expect(res.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
		expect(res.createdAt).toBeA('number');
	});
});