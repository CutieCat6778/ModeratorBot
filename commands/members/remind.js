const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'remind',
        aliases: ["alert", "reminder"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return require('../../tools/sendMessage')(message, await require("../../noArgs/members/remind.js")(client.guild.get(message.guild.id).prefix));
            } else if (args[0]) {
                const time = args[0].toString();
                const date = new Date()
                if (!require("ms")(time) || isNaN(require("ms")(time)) == true) return message.channel.send("Can't not parse the time, example (10s, 10m, 10h, 10d)");
                if (require("ms")(time) < 1000) return message.channel.send("The time can't be less then 1 second");
                const text = args.slice(1).join(" ");
                if (!text) return message.channel.send("Please supply a remind text");
                else if (text) {
                    message.channel.send(`I will remind you after ${require("ms")(require("ms")(time), { long: true })}`)
                    return client.setTimeout(() => {
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setDescription(`<:bell:774311088032055356> **${text}**`)
                            .setTimestamp(date)
                        return message.author.send(embed);
                    }, require("ms")(time))
                }
            } else {
                return message.channel.send("idk what is going on. . .");
            }
        } catch (e) {
            return require("../../tools/error")(e, message);
        }
    }
}