const { Message, Client } = require('discord.js'); // 자동입력 되는거 싫으면 이거 없애고 6~11 줄 지우세요.
module.exports = {
    name: "", // 메인명령어
    aliases: [], // 대체명령어
    permissions: [], // 권한
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        // 코드 입력 (디스코드 V13 으로 맞춰야 합니다.)
    }
}