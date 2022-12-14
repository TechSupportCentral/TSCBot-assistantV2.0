module.exports = {
    name: 'credit',
    aliases: [`credits`],
    category: 'Infos',
    utilisation: '{prefix}credit',

    execute(client, message) {
        message.delete();
        message.channel.send({
            embed: {
                color: 'PURPLE',
                author: { name: "credits" },
                fields: [
                   {name: "Main bot (Python)", value: "by BenTheTechGuy"},
                   {name: "Assistant Bot (Javascript); handles staff activity tracking, credits", value: "by Philipp & BenTheTechGuy" },
                   {name: "Bot hosting", value: "by BenTheTechGuy"}
                ],
        }
    })

    message.channel.send({
        embed: {
            color: 'PURPLE',
            author: { name: "GitHub" },
            fields: [
                {name: 'Link:' , value: "https://github.com/TechSupportCentral"}
            ]
        },
    })}}