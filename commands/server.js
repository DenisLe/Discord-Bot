module.exports = {
	name: 'server',
	description: 'Sends server name and total members',
	execute(message, args) {
		message.channel.send(`Server Name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`);
	},
};