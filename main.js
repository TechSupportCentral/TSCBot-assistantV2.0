//module dependencies
const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client({ disableMentions: 'everyone' });
const mongoose = require('mongoose')
client.config = require('./config/bot');


//Startup 1/2

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


// Mongo DB connection
mongoose.connect(client.config.mongo,{
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log("Connected to mongo db"));

//activity points system


const BypassroleandstaffID = '892095942969413634'
const ticketcreate =  '824684376398233670'
const suggestions =  '824926277868978186'
const general =  '824042976371277888'
const games = '824059985998381138'
const setups = '824737989850169355'
const memes =  '824738477291601980'
const music =  '824067063941300224'
const funbots =  '832535838289297408'
const supportteam = '824065058388181013'
const bump =  '824185956549787659'
const  OwnerRoleID =  '824063311829925898'
const stafflogs =   '824194262279127060'

client.on("message", async (message) => {
	if(message.channel.type === `dm`) return ;
	if (!message.guild) return;
	if (message.author.bot) return;

	const Levels = require("discord.js-leveling");
	let membersWithRole = message.guild.roles.cache.get(BypassroleandstaffID,OwnerRoleID).members;
	let staff = message.guild.roles.cache.get(BypassroleandstaffID);

	if(message.member.roles.cache.has(staff.id))  {
		if(message.channel.id === ticketcreate) return
		if(message.channel.id ===suggestions) return
		if(message.channel.id ===general) return
		if(message.channel.id ===games) return
		if(message.channel.id ===setups) return
		if(message.channel.id ===memes) return
		if(message.channel.id ===music) return
		if(message.channel.id ===funbots) return
		if(message.channel.id ===supportteam) return
		if(message.channel.id ===bump) return

		let owners = message.guild.roles.cache.get(OwnerRoleID);
		if (message.member.roles.cache.has(owners.id)) return
		const randomAmountOfXp = Math.floor(Math.random() * 10) + 1;

	const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
	if(hasLeveledUp) {
		const user = await Levels.fetch(message.author.id, message.guild.id);
		console.log(`Activity level up: ${message.author.tag}`)
		let channelID =  stafflogs

	let logdest = new discord.MessageEmbed()
		.setTitle(`Activity Level up`)
		.setDescription(`${message.author.tag} has gained a higher activity level`)
		.setColor("BLUE")
		.setTimestamp()
	client.channels.cache.get(channelID).send(logdest)
    }}})

//DM log
let DMlog = '853984661360869386'
client.on('message', async (message) => {
	const dmmessage = message.channel.type === `dm`
	if (dmmessage) {
		if (message.author.bot) return;
		if (!message.content) message.content = `couldn't detect, probably a image or unknown Emoji`
		if(!message.author) message.author = `not able to detect`
		if(!message.author.id) message.author.id = `couldn't detect the ID of the User`

		let channelID = DMlog
		let logdest = new discord.MessageEmbed()
			.setTitle(`DM`)
			.setDescription(`by:  ${message.author}`  )
			.addField(` **Content:**`, message.content)
			.addField(`User ID:`, message.author.id)
			.setColor("RED")
			.setTimestamp()
			client.channels.cache.get(channelID).send(logdest)

    }})


    //Startup 2/2

    

    client.login(client.config.discord.token);
    