const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "ping",
        aliases: ["pinng"],
        perms: ["SEND_MESSAGES"],
        description: "You use this command to check my ping",
        category: "infomations",
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            const date1 = new Date()
            const guild = await require('../../tools/getGuild')(client, message.guild.id);
            const date2 = new Date();
            var value = date2 - date1;
            message.channel.send("Pinging").then(m => {
                let botMessage = m.createdTimestamp - message.createdTimestamp
                let Websocket = Math.floor(client.ws.ping);
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle(`${message.guild.me.displayName} ping`)
                    .addFields([
                        { "name": "<:bot:774311088246226984> Bot Message", "value": `${botMessage} ms` },
                        { "name": "<:websocket:774348022582214747> Websocket", "value": `${Websocket} ms` },
                        { "name": "<:database:777489828153262081> Database", "value": `${value} ms` }
                    ])
                    .setTimestamp()
                m.delete();
                require('../../tools/sendMessage')(message, embed);
            })
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}