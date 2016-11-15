	var socket = io();

	socket.on('connect', function () {
		console.log('Connected to server');

	});

	socket.on('disconnect', function () {
		console.log('Disconnected from server');
	});

	socket.on('newMessage', function (newMessage) {
		var formattedTime = moment(newMessage.createdAt).format('h:mm a');
		var template = $('#message-template').html();
		var html = Mustache.render(template, {
			text: newMessage.text,
			from: newMessage.from,
			createdAt: formattedTime
		});
		$('#messages').append(html);
	});

	socket.on('newLocationMessage', function(newLocationMessage) {
		var formattedTime = moment(newLocationMessage.createdAt).format('h:mm a');
		var template = $('#location-message-template').html();
		console.log(template);
		var html = Mustache.render(template, {
			from: newLocationMessage.from,
			createdAt: formattedTime,
			url: newLocationMessage.url
		});
		$('#messages').append(html);
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