const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socket(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket) => {
	console.log('New user connected');

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required');
		}
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		callback();
	});

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);
		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	});

	socket.on('createLocationMessage', (coordinates, callback) => {
		var user = users.getUser(socket.id);
		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coordinates.latitude, coordinates.longitude));
		}
	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
		}
	});

});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});