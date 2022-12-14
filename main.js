// module dependencies

const fs = require('fs');
const discord = require('discord.js');
const mongoose = require('mongoose')

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.MessageContent
    ]
});
client.config = require('./config/bot');


// Load events and commands

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};


fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});


// Connect to MongoDB

mongoose.connect(client.config.mongo,{
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log("Connected to mongo db"));


// Activity points system

client.on("message", async (message) => {
	if(message.channel.type === `dm`) return ;
	if (!message.guild) return;
	if (message.author.bot) return;

	const Levels = require("discord.js-leveling");
	let staff = message.guild.roles.cache.get(client.config.roles.spteam,client.config.roles.trialmod,client.config.roles.moderator).members;

	if(staff.includes(message.member))  {
		if(message.channel.id === client.config.channels.tickets) return
		if(message.channel.id === client.config.channels.suggestions) return
		if(message.channel.id === client.config.channels.general) return
		if(message.channel.id === client.config.channels.games) return
		if(message.channel.id === client.config.channels.setups) return
		if(message.channel.id === client.config.channels.memes) return
		if(message.channel.id === client.config.channels.bots) return
		if(message.channel.id === client.config.channels.spteam) return
		if(message.channel.id === client.config.channels.modtalk) return
		if(message.member.roles.cache.has(client.config.roles.owner)) return

		const randomAmountOfXp = Math.floor(Math.random() * 10) + 1;

	const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
	if(hasLeveledUp) {
		const user = await Levels.fetch(message.author.id, message.guild.id);
		console.log(`Activity level up: ${message.author.tag}`)
		let channelID = client.config.channels.modlog

	let logdest = new discord.MessageEmbed()
		.setTitle(`Activity Level up`)
		.setDescription(`${message.author.tag} has gained a higher activity level`)
		.setColor("BLUE")
		.setTimestamp()
	client.channels.cache.get(channelID).send(logdest)
    }}})


// DM log

client.on('message', async (message) => {
	const dmmessage = message.channel.type === `dm`
	if (dmmessage) {
		if (message.author.bot) return;
		if (!message.content) message.content = `couldn't detect, probably a image or unknown Emoji`
		if(!message.author) message.author = `not able to detect`
		if(!message.author.id) message.author.id = `couldn't detect the ID of the User`

		let channelID = client.config.channels.dmlog
		let logdest = new discord.MessageEmbed()
			.setTitle(`DM`)
			.setDescription(`by:  ${message.author}`  )
			.addField(` **Content:**`, message.content)
			.addField(`User ID:`, message.author.id)
			.setColor("RED")
			.setTimestamp()
			client.channels.cache.get(channelID).send(logdest)

    }})


client.login(client.config.token);
