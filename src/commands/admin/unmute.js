const { Message, Client } = require('discord.js');
module.exports = {
    name: "unmute",
    aliases: ["언뮤트", 'ㅕㅡ', 'speak', 'um', 'ㅕㅜㅡㅕㅅㄷ', '언뮤'],
    permissions: "MANAGE_ROLES",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let user = message.mentions.members.first();

        if(!args[0]) return message.channel.send('❌ 해방시킬 사람을 선택하세요.')
        
        if(!user) return message.channel.send(`❌ ${user} 이라는 사람은 이 서버에 없습니다.`);

        if (user.id === message.author.id) return message.channel.send('자신의 뮤트를 해제할 수 없습니다.');

        let role = message.guild.roles.cache.find(x => x.name === 'Muted');

        if(user.roles.cache.has(role)) return message.channel(`${user} 님은 뮤트상태가 아닙니다.`);

        user.roles.remove(role);

        message.channel.send(`${user} 님 해방되었어요!`)
    }
}