/* eslint-disable no-undef */
const ItemData = require('../itemdata.js');

defaultDictionary = {
	'default': ['There\'s nothing here anymore...', null],
};

startingRoomUnlockDictionary = {
	'0314':     [ '```ini\n' +
                    'The locker unlocks are inside you see a [Room Key]' +
                    '```', ItemData.TUTORIAL_ROOM_KEY],
	'default': ['There\'s nothing here anymore...', null],
};


module.exports = {
	name: 'unlock',
	description: 'Unlock an item.',
	hidden: false,
	execute(message, args, Tags) {

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

		const password = args[0].toLowerCase();

		switch (message.channel.name) {
		case 'test':
			// str = roomDefaultDictionary.test[0];
			// attachedImage = true;
			// imagePath = roomDefaultDictionary.test[1];
			// data.push(str);
			break;

		case 'starting':

			// Likely useless try/catch
			try{

				// Test if password is in room dictionary
				if(password in startingRoomUseItemDictionary) {
					// Password correct
					str = startingRoomUseItemDictionary[password][0];

					// Should check if unlocking the lock gives players an item or not
					if (startingRoomUseItemDictionary[password][1] != null) {
						this.AddItemToPlayer(message, args, Tags, message.author.username, startingRoomUseItemDictionary[password][1]);
					}
				}
				else{
					str = 'This password is not correct.';
				}

			}
			catch (err) {
				str = 'This password is not correct.';
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

	async AddItemToPlayer(message, args, Tags, playerName, ItemName) {
		try {
			const affectedRows = await Tags.update({ item: ItemName }, { where: { player_name: playerName } });
			if (affectedRows > 0) {
				return message.reply(`Tag ${tagName} was edited.`);
			}
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				return message.reply('Something went wrong with editing a tag.');
			}
			console.log(e);
			return message.reply('Something went wrong with adding a tag.');
		}
	},
};