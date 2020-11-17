const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "userinfo",
        aliases: ["whois", "uinfo", "useri"],
        category: "infomations",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            let target = await message.guild.members.fetch(args[0] ? await require('../../tools/mentions')(args[0]) : message.author.id);
            if (!target) return message.channel.send("User not found");
            const date = new Date(target.joinedAt).toLocaleString()
            const date2 = new Date(target.user.createdAt).toLocaleString()
            let Activity = target.presence;
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`<:information:777490082289680395> ${target.user.username}'s infomation`)
                .setThumbnail(target.user.displayAvatarURL())
                .addField("Username", target.user.username, true)
                .addField("User's id", target.user.id, true)
                .addField("Status", target.user.presence.status == "offline" ? "<:afk:777491403676188702>" : "<:online:777491825362599947>", true)
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