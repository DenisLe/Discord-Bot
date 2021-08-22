/* eslint-disable no-undef */
defaultDictionary = {
	'default': ['There\'s nothing here anymore...'],
};

startingRoomExamineDictionary = {
	'door':     [ '```ini\n' +
                    'The door is locked. Looks like it needs a key to open.' +
                    '```'],
	'bed':      [ '```ini\n' +
                    'A fluffy pillow rests on the firm mattress. The pillow is damp in some spots. Could it be drool?' +
                    '```'],
	'locker':   [ '```ini\n' +
                    'A locked locker. There is a 4-digit display along with a numerical keypad near the handle. Upon closer inspection, it looks like someone drew a faint arrow that points to the table.' +
                    '```'],
	'table':    [ '```ini\n' +
                    'A solid and sturdy table. That’s it. Oh. There’s an apple on it.' +
                    '```'],
	'apple':    [ '```ini\n' +
                    'You notice a small and unnaturally shiny apple sits on a table in the middle of the room. What will you do?\n' +
                    '1) Eat it [!eat apple]\n' +
                    '2) Lick it [!lick apple]\n' +
                    '3) Kick it [!kick apple]\n' +
                    '```'],
	'default': ['There\'s nothing here anymore...'],
};


module.exports = {
	name: 'examine',
	description: 'Examines an item.',
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
				str = startingRoomExamineDictionary[arg][0];
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