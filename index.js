// Node's native file system module
const fs = require('fs');

// Require the Node.js module
const Discord = require('discord.js');

// Require Sequelize
const Sequelize = require('sequelize');

// Create a new Discord Client
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();


const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

/*
 * equivalent to: CREATE TABLE tags(
 * player_name VARCHAR(255),
 * item VARTCHAR(255),
 * rounds_left INT,
 * curse VARCHAR(255),
 * misc INT
 * );
 */
const Tags = sequelize.define('tags', {
	player_name: {
		type: Sequelize.STRING,
		unique: true,
	},
	item: Sequelize.STRING,
	rounds_left: Sequelize.INTEGER,
	curse: Sequelize.INTEGER,
	misc: Sequelize.STRING,
});

// Dynamically set commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// Executes once client is ready
client.once('ready', () => {
	Tags.sync({ force: true });
	console.log('Ready!');
});


client.on('message', async message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// regex to split along any amount of spaces
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// Checks for guildOnly property
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	// Checks for arguments and replies with proper usage if set
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// Adds cooldowns to collection even if they're not defined
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	//
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		// If typeless, don't send and SQL data
		if (!command.type) {
			command.execute(message, args, null);
		}
		// Otherwise in this simple game, we can assume we need the SQL data
		else {
			command.execute(message, args, Tags);
		}
	}

	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

// Handles
client.on('voiceStateUpdate', async (oldState, newState) => {
	console.log('Ready!');
	console.log(oldState);
	console.log(newState);
});

// Login to Discord with token
client.login(token);
