const expect = require('expect');
const {Users} = require('./users.js');



describe('Users', () => {

	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node'
		}, {
			id: '2',
			name: 'Julie',
			room: 'React'
		}, {
			id: '3',
			name: 'Bob',
			room: 'Node'
		}];
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: 123,
			name: 'Dave',
			room: 'room name example'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		var user = users.removeUser('3');
		expect(user).toEqual({
			id: '3',
			name: 'Bob',
			room: 'Node'
		});
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		var user = users.removeUser('27');
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		var user = users.getUser('2');
		expect(user).toEqual({
			id: '2',
			name: 'Julie',
			room: 'React'
		});
	});

	it('should not find user', () => {
		var user = users.getUser('21');
		expect(user).toNotExist();
	});

	it('should return names for Node room', () => {
		var userList = users.getUserList('Node');
		expect(userList).toEqual(['Mike', 'Bob']);
	});

	it('should return names for React room', () => {
		var userList = users.getUserList('React');
		expect(userList).toEqual(['Julie']);
	});

});