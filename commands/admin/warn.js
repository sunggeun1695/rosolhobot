const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "경고",
    description: "Warn a member",

    async run (client, message, args) {
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('서버 관리 권한이 필요합니다.');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('멘션 또는 ID를 통해 사용자을 지정하세요!');

        if(user.bot) return message.channel.send('봇한테는 경고를 줄수없습니다.');

        if(message.author.id === user.id) return message.channel.send('자신을 경고 할수 없습니다.');

        if(message.guild.owner.id === user.id) return message.channel.send('대표한테 경고 할수 없습니다.');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = '그냥 경고다 임마.';

        let warnemssage = `${user}님은 경고를 8번 먹어서 자동으로 밴처리 되었습니다.`

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 8) return message.channel.send(`${user} 님은 이미 8번째 경고를 먹었어요.`);
        user.ban(warnemssage)
        user.send(`당신은 ${message.guild.name} 에서 밴당했습니다. 이유: 경고를 8번 먹어서`)


        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`당신은 ${message.guild.name} 에서 다음과 같은 이유로 경고먹었습니다. : \`${reason}\``)
            await message.channel.send(`**${user.username}** 경고를 받았습니다.`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in ${message.guild.name} 다음과 같은 이유로: \`${reason}\``)
            await message.channel.send(`**${user.username}** 경고를 받았습니다`)
        }
    }
}