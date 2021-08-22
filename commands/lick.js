/* eslint-disable no-undef */
// TODO
defaultDictionary = {
	'default': ['There\'s nothing here anymore...'],
};

startingRoomLickDictionary = {
	'apple':     [ '```ini\n' +
                    'Licking the apple is clearly the most logically sound decision here. You aggressively lick the apple trying to get its ' +
                    'center in the fewest licks. Surprisingly, the apple’s exterior has a candy-like flavor. After several minutes of licking ' +
                    'and a tired and dry tongue, you look down at the apple and see the numbers “0314” printed on the apple.' +
                    '```'],
	'default': ['There\'s nothing here anymore...'],
};


module.exports = {
	name: 'lick',
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
				str = startingRoomLickDictionary[arg][0];
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