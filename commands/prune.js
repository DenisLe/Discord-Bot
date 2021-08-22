module.exports = {
	name: 'prune',
	description: '@prune x deletes x previous messages.',
	cooldown: 5,
	execute(message, args) {
		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			return message.reply('That doesn\'t seem to be a valid number.');
		}
		else if (amount < 2 || amount > 100) {
			return message.reply('You need to input a number between 2 and 100.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send(`Error: ${err.message}`);
		});
	},
};