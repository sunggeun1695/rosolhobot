const { Message, Client } = require('discord.js');
module.exports = {
    name: "mute",
    aliases: ["뮤트", 'ㅡ', 'nospeak', 'unspeak', 'm', 'ㅡㅕㅅㄷ', '뮤'],
    permissions: "MANAGE_ROLES",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let user = message.mentions.members.first();

        if(!args[0]) return message.channel.send('❌ 뮤트할 사람을 선택하세요.')
        
        if(!user) return message.channel.send(`❌ ${user} 이라는 사람은 이 서버에 없습니다.`);

        if (user.id === message.author.id) return message.channel.send('자신을 뮤트할 수 없습니다.');

        let role = message.guild.roles.cache.find(x => x.name === 'Muted');

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "사유 없음"

        if (!role) return message.channel.send('현재 역할만들기 코딩이 굉장히 어려우므로 수동으로 생성해주시기 바랍니다.');

        user.roles.add(role);

        await message.channel.send(`:white_check_mark: ${user} 님을 성공적으로 뮤트하였습니다. 사유: ${reason}`);
    }
}