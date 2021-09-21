const { chatBot } = require('reconlx');
const { Message, Client } = require('discord.js');

module.exports = {
    name: "채팅",
    aliases: ["chat", '대화'],
    permissions: [],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        chatBot(message, args.join(" "))
    }
}