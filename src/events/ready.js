const client = require("..");
const config = require("../config.json")

client.on('ready', () => {
    console.log(`${client.user.username} 으(로) 로그인 하였습니다.`);
    client.user.setActivity(`${config.prefix}help | ${client.guilds.cache.size}개의 서버에서 일하는중`, { type: "WATCHING" });
})