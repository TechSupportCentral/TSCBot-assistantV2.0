module.exports = {
    name: 'delete',
    aliases: [`delete-ticket`],
    category: 'Tickets',
    utilisation: '{prefix}ticket',

    async execute (client,message)  {

        const {TicketManager} = require('discord-tickets');

        await client.ticketManager.deleteTicket(ticket);
    
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