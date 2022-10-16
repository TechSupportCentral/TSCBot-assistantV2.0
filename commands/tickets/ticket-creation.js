module.exports = {
    name: 'ticket',
    aliases: [`create-ticket`],
    category: 'Tickets',
    utilisation: '{prefix}ticket',



     async execute (client,message)  {

        await client.ticketManager.createTicket(message.guild, message.member);

    const {TicketManager} = require('discord-tickets');


    
client.ticketManager = new TicketManager(client, {
     enabled: true,//If Module is enabled
     parentId: '824692821197062194',//Ticket's category
     staffRole: '824056092899934218',//Role who have access to tickets
     closeParentId: '1031163777703493682',//Closed's tickets category
     channelTopic: true,
     storage: 'tickets.json',//Storage
     ticketCache: true//Save tickets on cache (TicketManager#tickets.get("channelId"))
});



}}