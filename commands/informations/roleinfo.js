
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "roleinfo",
        aliases: ["rolei", "rinfo"],
        category: "informations",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(bot, message, args) {
        try {
            if (!args[0]) return message.channel.send("Please mentions a role or supply a role ID");
            const role = message.guild.roles.cache.get(await require('mention-converter')(args[0].toString()));
            if (!role) return message.channel.send("Role not found")
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`<:information:777490082289680395> ${role.name} role informations`)
                .addField('Name', role.name, true)
                .addField('ID', role.id, true)
                .addField('Color', role.color, true)
                .addField('Hoist', role.hoist, true)
                .addField('Position', role.position, true)
                .addField('Mentionable', role.mentionable, true)
                .setTimestamp()
                .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
            require('../../tools/function/sendMessage')(message, embed);
        } catch (e) {
            return require("../../tools/function/error")(e, message);
        }

    }
}