const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "prefix",
        aliases: ["prefixes", "prefic"],
        category: "management",
        perms: ["MANAGE_GUILD"],
        description: "Change my prefix"
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                let emebd = await require("../../noArgs/management/prefix")(client.guild.get(message.guild.id).prefix);
                message.reply(emebd);
            } else if (args[1]) {
                return message.channel.send("The prefix can be only one word")
            } else if (args[0].startsWith("<&!")) {
                return message.channel.send("You can't mentions a channel as a prefix");
            } else if (args[0].startsWith("<@&")) {
                return message.channel.send("You can't mentions a role as a prefix");
            } else if (args[0]) {
                const prefix = args[0].toString();
                let guildData = await require("../../tools/getGuild")(message.guild.id);
                guildData.prefix = prefix;
                client.guild.get(message.guild.id).prefix = prefix;
                await guildData.save();
                client.guild.get(message.guild.id).prefix = prefix;
                message.channel.send(`My prefix in this server has been change to \`${prefix}\``);
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }

    }
}