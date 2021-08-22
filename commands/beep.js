module.exports = {
	name: 'beep',
	description: 'Boop!',
	guildOnly: true,
	execute(message, args) {
		message.channel.send('Boop.');
	},
};