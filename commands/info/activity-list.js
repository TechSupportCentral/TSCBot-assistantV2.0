const discord = require("discord.js")
module.exports = {
    name: 'activity-list',
    aliases: [`activity`],
    category: 'Infos',
    utilisation: '{prefix}activity-list',

async execute (client,message) {

    if (!message.member.roles.cache.has(client.config.roles.owner)) return message.channel.send("you don't have permissions to use this command!")

    const Levels = require("discord.js-leveling")
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

    if (rawLeaderboard.length < 1) return message.channel.send("Nobody's in the list yet.");

    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
    const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nActivity: ${e.level}\nActivity Points: ${e.xp.toLocaleString()}`);

const activityembed = new discord.MessageEmbed()
.setTitle('Activity')
.setDescription(`**Activity**:\n\n${lb.join("\n\n")}`)
.setColor('BLUE')
message.channel.send(activityembed)
}}
