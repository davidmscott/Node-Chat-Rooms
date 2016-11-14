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

	socket.on('newLocationMessage', function(newLocationMessage) {
		var li = $('<li></li>');
		var a = $('<a target="_blank">My current location</a>');

		li.text(`${newLocationMessage.from}: `);
		a.attr('href', newLocationMessage.url);
		li.append(a);
		$('#messages').append(li);
	});

	$('#message-form').on('submit', function (evt) {
		evt.preventDefault();

		var messageTextBox = $('[name=message]');

		socket.emit('createMessage',{
			from: 'User',
			text: messageTextBox.val()
		}, function () {
			messageTextBox.val('');
		});
	});

	var locationButton = $('#send-location');

	locationButton.on('click', function (evt) {
		evt.preventDefault();

		if (!navigator.geolocation) {
			return alert('Geolocation not supported by your browser.');
		}

		locationButton.attr('disabled', 'disabled').text('Sending location...');

		navigator.geolocation.getCurrentPosition(function (position) {
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
			locationButton.removeAttr('disabled').text('Send location');
		}, function () {
			alert('Unable to fetch location.');
			locationButton.removeAttr('disabled').text('Send location');
		});
	});