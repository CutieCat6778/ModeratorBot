const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "serverinfo",
        aliases: ["sinfo", "serverdesc", "guildinfo"],
        category: "infomations",
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            const embed = new MessageEmbed()
                .setColor("#669fd2")
                .setTitle(`${message.guild.name} info`)
                .setThumbnail(message.guild.iconURL())
                .addField("Guild Name", `${message.guild.name}`, true)
                .addField("Guild Id", `${message.guild.id}`, true)
                .addField("Guild Owner", `${message.guild.owner}`, true)
                .addField("Member Count", `${message.guild.memberCount}`, true)
                .addField("Roles Count", `${message.guild.roles.cache.size}`, true)
                .addField("Bots Count", `${message.guild.members.cache.filter(b => b.user.bot).size}`, true)
                .addField("System channel", `${message.guild.systemChannel}`, true)
                .addField("Server region", `${message.guild.region}`, true)
                .addField("Vertification level", `${message.guild.verificationLevel}`, true)
                .addField("Vertifed:", `${message.guild.verified}`, true)
                .addField("Server created on", `${new Date(message.guild.createdAt).toLocaleString()}`)
                .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
                .setTimestamp()
            return message.channel.send(embed)
        } catch (e) {
            return require('../../tools/error')(e, message);
        }

    }
}