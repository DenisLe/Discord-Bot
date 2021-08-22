module.exports = {
	name: 'bot',
	description: 'Sends Bot join date and Owner',
	execute(message, args) {
		message.channel.send(`Joined At: ${message.guild.joinedAt}\nOwner: ${message.guild.owner}`);
	},
};