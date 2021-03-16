const db = require('quick.db');
const ms = require('parse-ms');
const Discord = require('discord.js');

module.exports = {
    name: "돈받기",
    description: "Receive a daily award of money",

    async run (client, message, args) {
      
   
        let user = message.author;
        let amount = 100000;
        let momeyowner = 3120102310;

        if(message.author.id == '813634627800530984' || message.author.id == '452139199865552906' || message.author.id == '511070420179615744' || message.author.id == '792294392420499456') {
            db.add(`money_${message.guild.id}_${user.id}`, momeyowner);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
            

            message.channel.send(`2배 돈 지급! ${momeyowner}원을 지급했습니다.`)
        }

     

            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            message.channel.send(`${amount}원이 지급되었어요! (오너, 서버 부스터 일경우 2배로 받습니다.)`);
    }
}