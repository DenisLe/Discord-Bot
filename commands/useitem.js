/* eslint-disable no-undef */
const ItemData = require('../itemdata.js');

defaultDictionary = {
	'default': ['There\'s nothing here anymore...'],
};

startingRoomUseItemDictionary = {
	'door':     [ '```ini\n' +
                    'You slide the key into the keyhole and turn. Freedom!' +
                    '```',
	ItemData.TUTORIAL_ROOM_KEY,
	],
	'bed':      [ '```ini\n' +
                    'Hmmm. That didn\'t work.' +
                    '```',
	null,
	],
	'locker':   [ '```ini\n' +
                    'Hmmm. That didn\'t work.' +
                    '```',
	null,
	],
	'table':    [ '```ini\n' +
                    'Hmmm. That didn\'t work.' +
                    '```',
	null,
	],
	'apple':    [ '```ini\n' +
                    'Hmmm. That didn\'t work.' +
                    '```',
	null,
	],
	'default':  [ '```ini\n' +
                    'Hmmm. That didn\'t work.' +
                    '```',
	null,
	],
};


module.exports = {
	name: 'useitem',
	description: 'Uses an item.',
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

		userItem = this.run(message, args, Tags);

		const arg = args[0].toLowerCase();

		switch (message.channel.name) {
		case 'test':
			// str = roomDefaultDictionary.test[0];
			// attachedImage = true;
			// imagePath = roomDefaultDictionary.test[1];
			// data.push(str);
			break;

		case 'starting':
			// Likely unneeded try catch
			try{
				if(arg in startingRoomUseItemDictionary) {

					if(startingRoomUseItemDictionary[arg][1] === userItem) {
						str = startingRoomUseItemDictionary[arg][0];
					}
					else{
						str = startingRoomUseItemDictionary['default'][0];
					}
				}
				else{
					str = 'This is not a valid argument!';
				}
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

	async run(message, args, Tags) {
		tagName = message.author.username;

		const tag = await Tags.findOne({ where: { player_name: tagName } });
		if (tag) {
			// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
			console.log('UseItem query: Success!');
			console.log('Player Name: ' + tag.player_name);
			console.log('Item being used: ' + tag.item);
		}
		else{
			console.log('Player being queried: ' + tagName);
			message.channel.send('Database query failed.', { split: true });
			return null;
		}

		item = tag.item;
		return item;
	},
};