const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "statcord",
        aliases: ['statc', 'statscord'],
        perms: ['CREATOR'],
        bot: ['SEND_MESSAGES'],
        category: "developement"
    },
    async execute(client, message, args, guild) {
        return;
    }
}