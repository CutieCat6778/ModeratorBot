const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "userinfo",
        aliases: ["whois", "uinfo", "useri"],
        category: "infomations",
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            let target = await message.guild.members.fetch(await require('../../tools/mentions')(args[0]));
            if (!target || !args[0]) target = message.member;
            const date = new Date(target.joinedAt).toLocaleString()
            const date2 = new Date(target.user.createdAt).toLocaleString()
            let Activity = target.presence;
            const embed = new MessageEmbed()
                .setColor("#669fd2")
                .setTitle(`${target.user.username}'s infomation`)
                .setThumbnail(target.user.displayAvatarURL())
                .addField("Username", target.user.username, true)
                .addField("User's id", target.user.id, true)
                .addField("Status", target.user.presence.status, true)
                .addField("Tag", "#" + target.user.discriminator, true)
                .addField("Bot", target.user.bot, true)
                .addField("Highest role", target.roles.highest.name, true)
                .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
                .setTimestamp()
            if (Activity.status != "offline") {
                if (Activity.activities[0] != null) {
                    if (Activity.activities[0].name) {
                        embed.addField("Current Activity", Activity.activities[0].name, true)
                        if (Activity.activities[0].state) {
                            embed.addField("Activity's state", Activity.activities[0].state, true);
                            if (Activity.activities[0].details && Activity.activities[0].details != undefined) {
                                embed.addField("Activity's details", Activity.activities[0].details, true);
                            }
                        }
                    }
                }
            }
            message.channel.send(embed.addField("Joined server", date, true)
                .addField("Joined Discord", date2, true))
        } catch (e) {
            return require("../../tools/error")(e, message);
        }
    }
}