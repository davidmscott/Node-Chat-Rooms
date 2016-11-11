const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const {generateMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socket(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

	socket.on('createMessage', (createdMessage) => {
		console.log('createMessage', createdMessage);
		io.emit('newMessage', generateMessage(createdMessage.from, createdMessage.text));
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});