/* eslint-disable no-undef */
// TODO
defaultDictionary = {
	'default': ['There\'s nothing here anymore...'],
};

startingRoomKickDictionary = {
	'apple':     [ '```ini\n' +
					'You kick the apple off the table. As it collides with the wall, your expectations of being covered ' +
					'in apple juices and segments were let down as the apple bounces off. As it rolls to a stop, you notice ' +
					'a small piece of the outer shell is chipping away barely revealing something else underneath. If only more of the shell was removed.' +
                    '```'],
	'default': ['There\'s nothing here anymore...'],
};


module.exports = {
	name: 'kick',
	description: '???',
	hidden: false,
	execute(message, args) {

		const data = [];
		attachedImage = false;
		imagePath = null;

		if(args.length == 0) {
			message.channel.send('There are no arguments...', { split: true });
			return;
		}

		if(args.length > 1) {
			message.channel.send('Too many arguments!', { split: true });
			return;
		}

		const arg = args[0].toLowerCase();

		switch (message.channel.name) {
		case 'test':
			// str = roomDefaultDictionary.test[0];
			// attachedImage = true;
			// imagePath = roomDefaultDictionary.test[1];
			// data.push(str);
			break;

		case 'starting':
			try{
				str = startingRoomKickDictionary[arg][0];
			}
			catch (err) {
				str = 'This is not a valid argument!';
			}
			finally{
				data.push(str);
			}
			break;

		default:
			str = defaultDictionary.default[0];
			data.push(str);
			break;

		}

		if (attachedImage) {
			console.log(data);
			console.log(imagePath);
			console.log(args);
			message.channel.send(data, { files: [imagePath] }, { split: true });
		}
		else {
			console.log(data);
			console.log(args);
			message.channel.send(data, { split: true });
		}
	},
};