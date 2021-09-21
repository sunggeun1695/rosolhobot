const { MessageFlags, Message, Client } = require('discord.js');

module.exports = {
    name: "say",
    aliases: [],
    permissions: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let msg;
        message.delete()
        msg = args.join(" ");
        message.channel.send(msg)
    }
}