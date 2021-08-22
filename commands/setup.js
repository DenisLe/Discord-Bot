/* eslint-disable no-undef */
/*
*	player_name: {
		type: Sequelize.STRING,
		unique: true,
	},
	item: Sequelize.STRING,
	rounds_left: Sequelize.INTEGER,
	curse: Sequelize.STRING,
	misc: Sequelize.STRING,
*
*/

// Node's native file system module
const ItemData = require('../itemdata.js');

const curseEnum = { LIAR_CURSE:1, INDECISIVE_CURSE:2, SLOW_CURSE:3, CURIOSITY_CURSE:4, FEAR_CURSE:5, MUTE_CURSE:6, NOHANDS_CURSE:7, NOTHING_CURSE:8 };

module.exports = {
	name: 'setup',
	description: 'Basic setup functions.',
	hidden: false,
	type: 'Special',
	execute(message, args, Tags) {

		this.run(message, args, Tags);
	},

	async run(message, args, Tags) {
		// Will need to update this to add everyone
		// message.guild.members.fetch().then(members => console.log(members))

		tagName = message.author.username;
		tagItem = ItemData.APPLE;
		rounds = 10;
		acquiredCurse = curseEnum.LIAR_CURSE;
		someData = '';

		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Tags.create({
				player_name: tagName,
				item: tagItem,
				rounds_left: rounds,
				curse: acquiredCurse,
				misc: someData,
			});
			return message.reply(`Tag ${tag.player_name} added.`);
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				return message.reply('That tag already exists.');
			}
			console.log(e);
			return message.reply('Something went wrong with adding a tag.');
		}
	},
};