/* eslint-disable no-undef */
// TODO
defaultDictionary = {
	'default': ['There\'s nothing here anymore...'],
};

startingRoomEatDictionary = {
	'apple':    [ '```ini\n' +
                    'You lift up the small apple and bring it to your mouth. As the apple touches your teeth, you regret your decision. ' +
                    'It’s hard. Too hard in fact. This apple is likely made of a hard plastic or metal. You do notice that your teeth managed ' +
                    'to scrape some of the outer shell off revealing something underneath. The paint tastes...nice!' +
                    '```'],
	'default':  ['There\'s nothing here anymore...'],
};


module.exports = {
	name: 'eat',
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
				str = startingRoomEatDictionary[arg][0];
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