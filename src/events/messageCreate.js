const client = require("..");
var config = require("../config.json");
const { MessageEmbed } = require("discord.js");

client.on('messageCreate', async message => {
    let prefix = config.prefix
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    // getting prefix when bot mention

    const command = client.commands.get(cmd.toLowerCase()) ||  client.commands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return;
    if (command) {
        // checking user perms
        if (!message.member.permissions.has(command.permissions || [])) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`**당신은 ${command.name} 을(를) 실행 시키려면 ${command.permissions} 권한이 필요합니다!**`)
                ]
            })
        }
        command.run(client, message, args, prefix)
    }
})
