const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});
module.exports = client;

const config = require("./config.json");

// Collection
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.queue = new Map();
client.slash = new Collection();
client.categories = fs.readdirSync("./src/commands/");

["command", "event"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(config.token);