const { Collection, Client, MessageEmbed, Message, MessageReaction, Intents, Webhook } = require('discord.js')
const { inspect } = require('util');
const fs = require('fs')
const { readdirSync } = require('fs');
const client = new Client({
    disableEveryone: true
});
require('./util/misc.js')



const config = require('./discord.json')
const keepAlive = require('./server.js');
const db = require('quick.db')
const moment = require("moment");
require("moment-duration-format");
const momenttz = require("moment-timezone");
const { join } = require('path');
const leveling = require('discord-leveling');
const { level } = require('chalk');
const prefix = config.prefix
const token = config.main_token
const admin = 813634627800530984
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map()
client.categories = fs.readdirSync("./commands/");
["command","event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

process.env.NODE_ENV = process.argv[2];
if (process.argv[2] == 'live') bot.token = config.live_token;
else if (process.argv[2] == 'qa') bot.token = config.qa_token;

// client.on('message', (message) => {
//    console.log(`${message.member.user.username}님이 ${message.guild.name} 서버 ${message.channel} 채널에서 채팅을 쳤습니다. 메시지 내용: ${message.content}`)
// })

client.on('ready', () => {    console.log(        `[시스템]${client.user.username}로 로그인 하였습니다.`    );
    client.user.setStatus('online');
    const botgame = [        `${prefix}help | ${client.guilds.cache.size}서버와 함께 운영중`,        `${prefix}help | ${client.users.cache.size}유저들과 같이 운영중`,        `${prefix}help | 버전 1.5.8v`, `${prefix}help | 대충 정렬한 명령어 탭을 볼려면 .?`   ];
    setInterval(() => {        
    const activity = botgame[Math.floor(Math.random() * botgame.length)];    
    client.user.setActivity(activity);  }, 3000 ); 
});

client.on('message', async message =>{
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(message.channel.type == 'dm') return;
  if(!message.guild) return;
  if(!cooldowns)
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  if(command) command.run(client, message, args) 
})

client.on('message', (message) => {
  if(message.content == `${prefix}선거`) {
      message.reply('님 아래에 있는 사람들을 투표해주세요!\n[시스템]: 투표를 해주세요. 투표가 끝나면은 제작자에게 DM 부탁드립니다\n 1. 강아지 \n 2. 임시계정 \n 3. Random Studio \n 4. 나아바')
  }
})



client.on('message', (message) => {
    if(message.content == `${prefix}`) {
        const help = new MessageEmbed()
        .setTitle('도움말 간단하게')
        .addField('`.코로나`', '코로나 상태를 보여줍니다.')
        .addField('`.help`', '이 도움말 명령어보다 더 구체적으로 볼수 있습니다.')
        .addField('`.킥`', '.help 에서는 싸대기라고 나와있지만 킥입니다')
        .addField('`.레벨`', '패치됨.')
        .addField('`.밴`', '유저를 아예 못들어오게 합니다')
        .addField('`.경고`', '유저가 잘못한게 있을경우 이 명령어를 사용하세요')
        .addField('`.경고확인`', '유저의 경고 또는 나의 경고를 확인할수 있습니다')
        .addField('`.경고삭제`', '그 사람의 죄를 사합니다')
        .addField('`.임베드`', '임베드를 줍니다.')
        .setFooter('로블이 BOT ❤️')
        message.channel.send(help)
    }
})

client.on('message', (message) => {
    if(message.content == `${prefix}임베드`) {
        const embed = new MessageEmbed()
        .setTitle('임베드')
        .setFooter('임베드임')
        .setFooter('ㄹㅇㅋㅋ')
        message.channel.send(embed)
    }
})

client.on('message', (message) => {
    if(message.content == '휴먼 해제좀') {
        let role = message.guild.roles.cache.find(x => x.name === "휴먼상태");
        message.reply('휴면 상태가 해제되었습니다.')
        message.member.roles.remove(role)
    }
})

client.on('guildMemberAdd', member => {
    const welcome = member.guild.systemChannel
    if (!welcome) return;
    const welcomemessage = new MessageEmbed()
    .setColor("GREEN")
    .setTitle('새로운 멤버')
    .setDescription(`${member}님이 ${member.guild.name}에 오셨어요!`)
    welcome.send(welcomemessage)
})

client.on('guildMemberRemove', member => { // 멤버 퇴장알림
    let muterole = member.guild.roles.cache.find(r => r.name == "Muted") // 뮤트 역할을 찾아봄
    const leave = member.guild.systemChannel // 퇴장 채널을 시스템 채널로 지정
    const banAlertChannel = member.guild.systemChannel // 경고 채널을 시스템 채널로 지정
    if (!leave) return; // 시스템 채널이 없을경우 리턴
    const leavemessage = new MessageEmbed() // 임베드 생성
    .setColor("RED") // 색깔 지정
    .setTitle('멤버 퇴장') // 타이틀 지정
    .setDescription(`${member}님이 ${member.guild.name} 에서 나갔어요.. 안녕히가세요ㅜㅜ`) // 설명 지정
    leave.send(leavemessage) // 임베드 전송

    // if(muterole) {
    //     member.ban('뮤트먹은 상태로 퇴장')
    //     const muteexitban = new MessageEmbed()
    //     .setColor("RED")
    //     .setTitle('뮤트먹은 상태로 퇴장알림')
    //     .addField(`${member} 님이 차단먹었습니다.`, '이유: 뮤트먹은 상태로 퇴장')
    //     .setFooter('로블이 BOT')
    //     member.send(muteexitban)
    //     banAlertChannel.send(muteexitban)
    // }
})

client.on('message', (message) => {
    if(message.content == '.서버수') {
        message.channel.send(`들어가있는 서버수! ${client.guilds.cache.size} ${message.guild.fetchInvites}`)
    }
})













keepAlive();
client.login(token);