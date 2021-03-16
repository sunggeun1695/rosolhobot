module.exports = {
    name: "mute",
    description: "Mute a member from your server",
    usage: ".ㅡ <사용자> 이유",
    aliases: ["m", "nospeak", "ㅡ", "ㅡㅕㅅㄷ", "뮤트", "닥쳐", "닥처", "아닥"],
    
    async run (client, message, args) {
      if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("권한이 없습니다");
  
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
      if (!user) return message.channel.send("사용자를 입력하지 않았습니다.\n사용법 : " + module.exports.usage);
  
      if (user.id === message.author.id) return message.channel.send(`**${client.author.tag}** 님 관리자한테 뮤트해달라고 하세 ㅇ`);
  
        // define mute role and if the mute role doesnt exist then create one
        let muterole = message.channel.guild.roles.cache.find(r => r.name == "Muted")
        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: client.colours.dark,
                    },
                    reason: reason,
                })
                muterole.setPermissions(new BitField(0)); // 어떤 권한도 없는 상태
                message.guild.channels.cache.forEach(async (channel, id) => { // 채널에서 muted 권한에게 아무 것도 안 주게 함.
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }
  
      if (!muterole) return message.channel.send("**Muted** 라는 역할이 없어서 새로 만듭니다");
  
      let reason = args.slice(1).join(" ");
      if (reason === null) reason = "그냥 뮤트다 임마."
  
      user.roles.add(muterole);
  
      await message.channel.send(`${user} 닥쳐라. 이 새끼야.`)
    }
  }