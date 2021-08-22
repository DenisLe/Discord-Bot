/*
*	player_name: {
		type: Sequelize.STRING,
		unique: true,
	},
	item: Sequelize.STRING,
	rounds_left: Sequelize.INTEGER,
	curse: Sequelize.STRING,
	misc: Sequelize.STRING,
*
*/

const { run } = require("./setup");

const curseEnum = {LIAR_CURSE:1, INDECISIVE_CURSE:2, SLOW_CURSE:3, CURIOSITY_CURSE:4, FEAR_CURSE:5, MUTE_CURSE:6, NOHANDS_CURSE:7, NOTHING_CURSE:8}

module.exports = {
	name: 'fetch',
    description: 'Query DB.',
    hidden: false,
    type: 'Special',
    execute(message, args, Tags) {

        this.run(message,args,Tags);

    },
    
    async run(message, args, Tags)
    {
        if(args.length == 0){
            message.channel.send("There are no arguments...", { split: true });
            return;
        }

        if(args.length > 1)
        {
            message.channel.send("Too many arguments!", { split: true });
            return;
        }

        const arg = args[0];
        tagName = arg;

        //Fetch all rows
        if(args === '*')
        {
        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tagList = await Tags.findAll({ attributes: ['player_name'] });
        const tagString = tagList.map(t => t.player_name).join(', ') || 'No tags set.';
        return message.channel.send(`List of tags: ${tagString}`);

        }
        else{
        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await Tags.findOne({ where: { player_name: tagName } });
        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
            console.log("Player Name: " + tag.player_name);
            console.log("Item ID or Name: " + tag.item);
            console.log("Rounds Left: " + tag.rounds_left);
            console.log("Curse: " + tag.curse);
            console.log("Misc: " + tag.misc);
            message.reply(`Player Name: ${tag.player_name}. Item held: ${tag.item}. Rounds Left: ${tag.rounds_left}.`);
        }
        else{
            return message.reply(`Could not find tag: ${tagName}`);
        }
        }


        
    }
};