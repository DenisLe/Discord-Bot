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


	//This bot replies with a random message from the 'channelID' channel 5% of the time.
	// 781408056071159818 quote-a-day-calendar
    const channelID = "581714968328536084";

    const testChannel = client.channels.cache.find(channel => channel.id === channelID)

	// Generate a number between 0-99 inclusive
	const rng = Math.floor(Math.random() * 100);

	if (rng >= 95){
		if (message.channel.type == 'text' && !message.author.bot) {
			aaa = testChannel.messages.fetch()
			.then(messages => {
				//messages.forEach(msg => console.log(msg.content))
				myMsg = messages.random()
				message.reply(("\"" + myMsg.content + "\""  + " - " + myMsg.author.username))
			})
			.catch(console.error)		
		}
	}

	return;
});

// Login to Discord with token
client.login(token);
