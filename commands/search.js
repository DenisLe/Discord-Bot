/* eslint-disable no-undef */
roomDescDictionary = {
	'test': [ ' A single table sits in the middle of the room. On the table is a picture and a message below it reading, "Hello World!"', './images/test.png'],
	'starting': ['```ini\n' +
                 'You look around and take in your surroundings. With a [bed] in the corner, a small [locker] next to the bed and a small [table] in the center of the room, ' +
                 'you safely assume this is some sort of living quarters. The [bed] is neatly made suggesting either whomever used it last is used to presenting their [bed] ' +
                 'in this manner or the [bed] hasn’t been used. The [locker] next to the [bed] is locked with a digit keypad mounted near the handle. On the [table] rests a small ' +
                 'red [apple]. There is a locked [door] on the other side of the table. A small keyhole is visible above the doorknob. \n' +
                 '```', './images/starting.png'],
	'default': ['There\'s nothing here anymore...', './images/default.png'],
};

module.exports = {
	name: 'search',
	description: 'Searches the area and your surroundings.',
	hidden: false,
	execute(message, args) {
		const data = [];
		attachedImage = false;
		imagePath = null;

		// Check for channel name
		switch (message.channel.name) {
		case 'test':
			str = roomDescDictionary.test[0];
			attachedImage = true;
			imagePath = roomDescDictionary.test[1];
			data.push(str);
			break;

		case 'starting':
			str = roomDescDictionary.starting[0];
			attachedImage = true;
			imagePath = roomDescDictionary.starting[1];
			data.push(str);
			break;

		default:
			str = roomDescDictionary.default[0];
			attachedImage = false;
			data.push(str);
			break;

		}

		if (attachedImage) {
			console.log(data);
			console.log(imagePath);
			console.log('Arguments' + args);
			message.channel.send(data, { files: [imagePath] }, { split: true });
		}
		else {
			console.log(data);
			console.log(args);
			message.channel.send(data, { split: true });
		}
	},
};