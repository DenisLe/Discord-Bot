/* eslint-disable no-unused-vars */
module.exports = {
	name: 'user-info',
	description: 'Sends username, ID, and date joined',
	execute(message, args) {
		message.channel.send(`Your Username: ${message.author.username}\nYour ID: ${message.author.id}\nDate Joined: ${message.author.joinedAt}`);
	},
};