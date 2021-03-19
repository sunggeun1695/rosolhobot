const { Collection, Client, MessageEmbed } = require('discord.js')
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
require('dotenv').config()
const prefix = config.prefix
const token = config.qa_token
const admin = 813634627800530984
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map()
client.categories = fs.readdirSync("./commands/");
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











keepAlive();
client.login(process.env.token);