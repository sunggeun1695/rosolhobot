const { Client } = require('discord.js');
const fs = require('fs');

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
    try {
        let command = 0;
        fs.readdirSync("./src/commands").forEach(cmd => {
        
            let commands = fs.readdirSync(`./src/commands/${cmd}/`).filter((file) => file.endsWith(".js"));
            for (cmds of commands) {
                let pull = require(`../commands/${cmd}/${cmds}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    command++
                } else {
                    console.log(`${cmds} 은(는) 아직 준비되지 않았습니다.`);
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));

            }
        })
        console.log(`${command} 을(를) 로드하였습니다.`);
    } catch (e) {
        console.log(e.message);
    }
}