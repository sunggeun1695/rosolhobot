const moment = require('moment-timezone');
const forbiddenWord = require('../../util/forbiddenWord.json')

function checkChatting(client, message) { // 채팅 체크
    let best_talker = '813954391681794148';
    let sponer = '818769154894332004';
    let unmute_level = '<#813955047103791114> 가서 사죄하세요.'

    // 시간, 뮤트 롤
    let messageTime = moment().tz('Asia/Seoul').locale('ko').valueOf()
    let time = bot.authors.get(message.author.id);
    let forbiddenWordTime = bot.authors.get(message.author.id) || messageTime;

    // 후원자면서 채팅창지박령 일경우 걸리지 않음
    if(best_talker && sponer) return;

    // 욕설 체크
    let msgs = [
        message.content.replace('\n', ''),
        message.content.replace('\n', '').replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''),
        message.content.replace('\n', '').replace(/[^a-z|A-Z]/g, ''),
    ]
    for(fw of forbiddenWord) {
        if(msgs[0].indexOf(client.prefix) != -1) { // ㅗ 와 같이. 접두사와 욕이 섞일 수 있기 때문에 추가한 부분
            continue;
        }
        for(msg of msgs) {
            if(msg.indexOf(fw) != -1) {
                message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
                if(messageTime == forbiddenWordTime) {
                    message.reply(`첫 채팅이 욕임? ㅋ Mute 드셈\n사용한 욕: \`\`${fw}\`\` \`\`전 채팅과의 간격 ${messageTime - forbiddenWordTime}ms\`\`\n${unmute_level}`)
                } else {
                    message.reply(`욕 하지마라. 이자식아. 님 Mute 드셈\n사용한 욕: \`\`${fw}\`\` \`\`전 채팅과의 간격 ${messageTime - forbiddenWordTime}ms\`\`\n${unmute_level}`)
                }
            }
        }

    // 도배성 채팅 체크
    if(message.content == `${client.prefix}` || message.content == '?') {
        message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
        message.reply(`\`\`${client.prefix}\`\` \`\`?\`\` 하나만 치지 마세요. Mute 드셈.`)
        return true;
    } else if(!time) { // 채팅창지박령은 뮤트를 먹지 않지만 반대로 아닐경우 리턴을 해치
        client.authors.set(messsage.author.id, messageTime);
        return false;
    } else if(messageTime - time <= 3000) {
        message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
        message.reply(`단타 도배하지마세요. 님 Mute 드셈.\n\`\`전 채팅과의 간격 ${messageTime - forbiddenWordTime}\`\`\n${unmute_level}`)
        client.authors.set(message.author.id, messageTime)
        return true;
    }

    client.authors.set(message.author.id, messageTime);
    return false;
}}