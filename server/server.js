const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app!',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined.',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (createdMessage) => {
		console.log('createMessage', createdMessage);
		io.emit('newMessage', {
			from: createdMessage.from,
			text: createdMessage.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});