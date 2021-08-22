/* eslint-disable no-undef */
// Default message for channels

roomDefaultDictionary = {
	'test': [ 'An empty white rectangular room. It\'s large enough to move and jump around in.', './images/test.png'],
	'starting': ['```ini\n' +
                 'Welcome to the starting room! In this room, we’ll go over some basic commands and how to play.\n' +
                 'All rooms will have an opening tid-bit like the one you’re reading right now explaining what room you’re in.\n' +
                 'All players in this channel have a combined total of some actions. This amount will vary. The tutorial room gives you 10 actions but every other room in the game will be less. Each command generally uses 1 action. Use them wisely.\n\n' +
                 '[!search] will search the room and reveal Points of Interest. These are generally things that may have clues which can be used in some way in your game.\n\n' +
                 '[!examine <item-name>] will examine a Point of Interest. Sometimes, a choice will be given to the team about what to do. If a choice is displayed, the investigation does not cost an action. However, if no choice is presented, an action will be consumed.\n\n' +
                 'Eg:\n' +
                 'You notice a small and unnaturally shiny apple sits on a table in the middle of the room. What will you do?\n' +
                 '1) Eat it [!eat <name>]\n' +
                 '2) Lick it [!lick <name>]\n' +
                 '3) Kick it [!kick <name>]\n\n' +
                 'From the list of choices are commands you can type to perform that action on the specified item where <name> is the object to apply the action to. You actually don’t need to !examine something and reveal the choices to use those actions but should anyway since it’s free if choices are given.\n\n' +
                 '[!unlock <guess>] will attempt the password on all locks in the room. This only takes 1 action to perform and is only like this due to my laziness.\n' +
                 'If an item is present in the locker, a random player with an empty inventory slot will obtain the item. \n' +
                 'All locked items will re-lock themselves after handing out the item. \n' +
                 'In the case where no one has inventory space, the item will be left behind. \n\n' +
                 '[!item] will display what item you are holding. Does not cost an action.\n\n' +
                 '[!useitem <name>] will use the item you’re holding on something in the room specified by <name>.\n\n' +
                 'Go ahead and try [!search].\n\n' +
                 '[10 Actions Remaining]\n' +
                 '```', './images/starting.png'],
	'default': ['There\'s nothing here anymore...', './images/default.png'],
};

module.exports = {
	name: 'default',
	description: 'Displays the intro text in a room.',
	hidden: false,
	execute(message, args) {

		const data = [];
		attachedImage = false;
		imagePath = null;

		switch (message.channel.name) {
		case 'test':
			str = roomDefaultDictionary.test[0];
			attachedImage = true;
			imagePath = roomDefaultDictionary.test[1];
			data.push(str);
			break;

		case 'starting':
			str = roomDefaultDictionary.starting[0];
			attachedImage = true;
			imagePath = roomDefaultDictionary.starting[1];
			data.push(str);
			break;

		default:
			str = roomDefaultDictionary.default[0];
			attachedImage = false;
			data.push(str);
			break;

		}

		if (attachedImage) {
			console.log(data);
			console.log(imagePath);
			console.log(args);
			message.channel.send(data, { files: [imagePath] }, { split: true });
		}
		else {
			console.log(data);
			console.log(args);
			message.channel.send(data, { split: true });
		}
	},
};