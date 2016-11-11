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

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});