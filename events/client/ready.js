const config = require('../../discord.json')
const prefix = config.prefix

module.exports = bot => {
  let activities = [
      `${bot.guilds.cache.size}개의 서버와 함께 하는중`,
      `${bot.users.cache.size}명의 유저들과 함께 하는중`,
      '대충 정렬한 명령어탭을 볼려면 .?'
  ];
  let i = 0;
  setInterval(() => bot.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 3000)

  log(`${redChalk(bot.user.username)} ${greenChalk('is online')}`);
};
