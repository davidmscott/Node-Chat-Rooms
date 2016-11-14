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

		socket.emit('createMessage',{
			from: 'User',
			text: $('[name=message]').val()
		}, function (callback_data) {
			console.log('Got it', callback_data);
		});
	});

	var locationButton = $('#send-location');

	locationButton.on('click', function (evt) {
		evt.preventDefault();

		if (!navigator.geolocation) {
			return alert('Geolocation not supported by your browser.');
		}

		navigator.geolocation.getCurrentPosition(function (position) {
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, function () {
			alert('Unable to fetch location.');
		});
	});