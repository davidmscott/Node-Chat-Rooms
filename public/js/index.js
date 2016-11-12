	var socket = io();

	socket.on('connect', function () {
		console.log('Connected to server');

	});

	socket.on('disconnect', function () {
		console.log('Disconnected from server');
	});

	socket.on('newMessage', function (newMessage) {
		console.log('New message', newMessage);
		var li = $('<li></li>');
		li.text(`${newMessage.from}: ${newMessage.text}`);
		$('#messages').append(li);
	});

	$('#message-form').on('submit', function (evt) {
		evt.preventDefault();

		socket.emit('createMessage',{
			from: 'User',
			text: $('[name=message]').val()
		}, function (callback_data) {
			console.log('Got it', callback_data);
		});
	});