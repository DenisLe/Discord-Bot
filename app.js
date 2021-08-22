const Discord = require('discord.js');
const client = new Discord.Client();
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const { prefix, token } = require('./config.json');

// Adds add and getBalance methods
Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
	if (message.author.bot) return;

	// Add monie for messages
	if (message.content.length > 500) {
		currency.add(message.author.id, 25);
	}
	else if (message.content.length > 250) {
		currency.add(message.author.id, 15);
	}
	else if(message.content.length > 150) {
		currency.add(message.author.id, 10);
	}
	else if(message.content.length > 75) {
		currency.add(message.author.id, 5);
	}
	else if(message.content.length > 35) {
		currency.add(message.author.id, 3);
	}
	else if(message.content.length > 15) {
		currency.add(message.author.id, 2);
	}
	else if(message.content.length > 0) {
		currency.add(message.author.id, 1);
	}


	if (!message.content.startsWith(prefix)) return;
	const input = message.content.slice(prefix.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

	if (command === 'balance') {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
	}
	else if (command === 'inventory') {
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	}
	else if (command === 'transfer') {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
	}
	else if (command === 'buy') {
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
		if (!item) return message.channel.send('That item doesn\'t exist.');
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		currency.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought: ${item.name}.`);
	}
	else if (command === 'shop') {
		const items = await CurrencyShop.findAll();
		return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), { code: true });
	}
	else if (command === 'leaderboard') {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true }
		);
	}
	else if (command === 'gamble') {
		if (isNaN(commandArgs)) return message.channel.send(`Please enter an amount to gamble, ${message.author}.`);
		const bet = commandArgs;
		if (bet > currency.get(message.author.id).balance) return message.channel.send(`You have not enough minerals, ${message.author}.`);

		const randNum = Math.floor(Math.random() * Math.floor(100));
		if (randNum === 100) {
			currency.add(message.author.id, bet * 2);
			return message.channel.send(`Rolled a ${randNum}! You win ${bet * 2}, ${message.author}! `);
		}
		else if(randNum >= 50) {
			currency.add(message.author.id, bet);
			return message.channel.send(`Rolled a ${randNum}! You win ${bet}, ${message.author}! `);
		}
		else {
			currency.add(message.author.id, -bet);
			return message.channel.send(`Rolled a ${randNum}! You lost ${bet}, ${message.author}! `);
		}
	}
	else if (command === 'id') {
		if (message.author.id === '147475251574472704') {
			currency.add(message.author.id, 100);
			return message.channel.send(`Your ID: ${message.author.id}!`);
		}
		return message.channel.send(`Your ID: ${message.author.id}.`);
	}
	else if (command === 'battle') {
		const you = message.mentions.users.first();
		const me = message.author;

		// User Obj
		const target = await Users.findOne({ where: { user_id: you.id } });
		const user = await Users.findOne({ where: { user_id: me.id } });

		// Items belonging to each player
		const targetItems = await target.getItems();
		const userItems = await user.getItems();

		// if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		// return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	}
});

client.login(token);