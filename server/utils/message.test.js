const expect = require('expect');

var {generateMessage} = require('./message.js');

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