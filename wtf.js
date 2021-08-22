/* eslint-disable no-unused-vars */
// Node's native file system module
const fs = require('fs');

// Require the Node.js module
const Discord = require('discord.js');

// Create a new Discord Client
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();


// Executes once client is ready
client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', async message => {

	// if (!message.content.startsWith(prefix) || message.author.bot) return;
	if (message.content.toLowerCase().includes('near') || message.content.toLowerCase().includes('accuracy') || message.content.toLowerCase().includes('early')) {
		const emojiArray = client.emojis.map(e=>e);
		if(emojiArray.length <= 0) {
			console.log('emojiArray length 0.');
			return message.channel.send('No custom emojis found.');
		}
		const near = client.emojis.find(emoji => emoji.name === 'near');
		if (near != undefined) {
			return message.react(near.id);
		}
		else{
			return message.react(`${emojiArray[Math.floor(Math.random() * emojiArray.length)].id}`);
		}
	}

	if (message.channel.type == 'text') {
		message.channel.fetchMessages().then(messages => {
			const botMessages = messages.array();
			for (const msg of botMessages) {
				console.log(msg.content);
			}
		}).catch(err => {
			console.log('Error while finding messages!');
			console.log(err);
		});
	}


	// Generate a number between 0-99 inclusive
	const rng = Math.floor(Math.random() * 100);

	if (rng >= 50) {
	// message.guild.emojis.map(e=>e.toString()).join(' ');
		const clientEmojis = client.emojis.map(e=>e.toString()).join(' ');
		const guildEmoji = message.guild.emojis;

		if (guildEmoji.length <= 0) {
			console.log('guildEmoji length 0.');
			return message.channel.send('No custom emojis found.');
		}
		if(clientEmojis.length <= 0) {
			console.log('clientEmojis length 0.');
			return message.channel.send('No custom emojis found.');
		}
		const emojiArray = client.emojis.map(e=>e);
		if(emojiArray.length <= 0) {
			console.log('emojiArray length 0.');
			return message.channel.send('No custom emojis found.');
		}
		// console.log(`${emojiArray}`);
		return message.channel.send(`${emojiArray}`);
		// return message.channel.send(`${emojiArray[Math.floor(Math.random() * emojiArray.length)]}`);

	}
	if (rng <= 4) {
		const clientEmojis = client.emojis.map(e=>e.toString()).join(' ');
		const guildEmoji = message.guild.emojis;

		if (guildEmoji.length <= 0) {
			console.log('guildEmoji length 0.');
			return message.channel.send('No custom emojis found.');
		}
		if(clientEmojis.length <= 0) {
			console.log('clientEmojis length 0.');
			return message.channel.send('No custom emojis found.');
		}

		const emojiArray = client.emojis.map(e=>e);
		if(emojiArray.length <= 0) {
			console.log('emojiArray length 0.');
			return message.channel.send('No custom emojis found.');
		}
		return message.react(`${emojiArray[Math.floor(Math.random() * emojiArray.length)].id}`);
	}
	return;
});

// Login to Discord with token
client.login(token);
