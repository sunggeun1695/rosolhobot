const { Client, Collection, MessageEmbed, Intents } = require('discord.js')
const { inspect } = require('util');
const fs = require('fs')
const { readdirSync } = require('fs');
const client = new Client({
    ws: {
        intents: new Intents(['GUILDS',
            'GUILD_MEMBERS',
            'GUILD_BANS',
            'GUILD_EMOJIS',
            'GUILD_INTEGRATIONS',
            'GUILD_WEBHOOKS',
            'GUILD_INVITES',
            'GUILD_VOICE_STATES',
            'GUILD_PRESENCES',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
            'GUILD_MESSAGE_TYPING',
            'DIRECT_MESSAGES',
            'DIRECT_MESSAGE_REACTIONS',
            'DIRECT_MESSAGE_TYPING'])
    }
});
require('./util/misc.js')



const keepAlive = require('./server.js');
const db = require('quick.db')
const moment = require("moment");
require("moment-duration-format");
const momenttz = require("moment-timezone");
const { join } = require('path');
require('dotenv').config()
const prefix = process.env.prefix
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map()
client.categories = fs.readdirSync("./commands");
["command","event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

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


client.on('message', message => {
    if(message.content == '빅호가 ㄴㄱ') {
        message.reply('빅호 is <@!698472765170122842>')
    }
})

client.on('message', async message => {
    let checkingBlacklistedMembers = db.fetch(`blacklisted_${message.author.id}`)
        if (checkingBlacklistedMembers === null) {
            checkingBlacklistedMembers === false
        }
    
    
        let blacklistedEmbed = new MessageEmbed()
            .setTitle("당신은 블랙리스트에 추가되어 있습니다")
            .setColor('RED')
            .setDescription(`당신은 블랙리스트에 추가되어 있습니다. \n 해제 되실때까지 아이스의 모든 기능을 이용하실수 없습니다`)
            .setFooter("블랙문의는 섬광탄 (보스)#1111")
            .setFooter(`${client.user.username}`, client.user.avatarURL())
    
        if (checkingBlacklistedMembers === true) return message.channel.send(blacklistedEmbed)
    })

client.on('message', (message) => {
    if(message.content == '서버 터트리기') {
        message.channel.send(`${message.author} 님 진짜로 터트릴거죠? 후회 안한다고 믿겠습니다.)`)
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐삐')
        message.channel.send('ㅋ')
    }
})

client.on('message', async message => {

    let blacklisted = require('./util/forbiddenWord.json')
  
      let foundInText = false;
      for (var i in blacklisted) { 
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
      }
      let muterole = message.guild.roles.cache.find(x => x.name === 'Muted')
  
      if (foundInText) {
          message.member.roles.add(muterole)
          if(prefix+blacklisted) return;
          if(message.member.hasPermission('MANAGE_ROLES')) return;
          if(message.member.hasPermission('ADMINISTRATOR')) return;
          message.reply(`너는 욕을했구나 그러면은 조용이할 필요가 있단다. Mute 먹어라\n사용한 욕: \`\`${message.content.toLowerCase()}\`\``);
  }
  }
  );


client.on('message', (message) => {
    if(message.content == ';' || message.content == '?') {
        if(message.member.hasPermission('ADMINISTRATOR')) return;
        let muterole = message.guild.roles.cache.find(x => x.name === 'Muted')
        message.member.roles.add(muterole)
        message.reply(`\`\`;\`\` \`\`?\`\` 하나만 치지 마세요. Mute 드셈.`)
    }
})

client.on('message', (message) => {
    if(message.content == '역할빼기') {
        message.delete();
        const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle('경고')
        .setDescription(`${message.mentions} 님이 역할 다운그레이드를 당했습니다.`)
        message.channel.send(embed)
    }
})

client.on('messageDelete', message => {
    if(!message.partial) {
        const channel = client.channels.cache.get('806409549258686504');
        if(channel) {
            const embed = new MessageEmbed()
                .setTitle('삭제 메세지')
                .addField('메세지를 삭제한 사람', `${message.author.tag} (${message.author.id})`, true)
                .addField('채널', `${message.channel.name} (${message.channel.id})`, true)
                .setDescription(message.content)
                .setTimestamp();
            channel.send(embed);
        }
    }
});


client.on('messageUpdate', (newMessage, olderMessage) => {
    if(!olderMessage.partial) {
        const channel = client.channels.cache.get('815114144465944606');
        if(channel) {
            const embed = new MessageEmbed()
                .setTitle('수정 메시지')
                .addField('메시지를 수정한 사람', `${olderMessage.author.tag} (${olderMessage.author.id})`, true)
                .addField('채널', `${olderMessage.channel.name} (${olderMessage.channel.id})`, true)
                .addField('수정하기 전 메시지', `${olderMessage.content}`, true)
                .addField('수정 후 메시지', `${newMessage.content}`, true)
                .setTimestamp();
            channel.send(embed)
        }
    }
})















keepAlive();
client.login(process.env.token);