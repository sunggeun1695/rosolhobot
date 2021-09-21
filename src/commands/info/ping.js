const { Client, Message } = require("discord.js")

module.exports = {
    name: "ping",
    aliases: ["핑", "p", "pong", "퐁", "ㅍ"],
    permissions: ["SEND_MESSAGES"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.channel.send({ content: `💚 Pong! ${client.ws.ping}ms` })
    }
}