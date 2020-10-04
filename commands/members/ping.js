const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "ping",
        aliases: ["pinng"],
        perms: ["SEND_MESSAGES"],
        description: "You use this command to check my ping",
        category: "members"
    },
    async execute(client, message, args) {
        try {
            const date1 = new Date()
            const guild = require("../../tools/getGuild")(message);
            const date2 = new Date();
            var value = date2 - date1;
            message.channel.send("Pinging").then(m => {
                let botMessage = m.createdTimestamp - message.createdTimestamp
                let Websocket = Math.floor(client.ws.ping);
                let embed = new MessageEmbed()
                    .setColor("#eec4c6")
                    .setTitle("🏓 Pong")
                    .addFields([
                        { "name": "Bot Message", "value": `${botMessage} ms` },
                        { "name": "Websocket", "value": `${Websocket} ms` },
                        { "name": "Database", "value": `${value} ms` }
                    ])
                    .setTimestamp()
                m.delete();
                message.channel.send(embed);
            })
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}