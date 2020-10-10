const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    try {
        let guild = await require("../../tools/getGuild")(client, member.guild.id);
        if (guild.wellcome.enable == false) return;
        if (guild.wellcome.channelId == " " || isNaN(guild.wellcome.channelId) == true) return;
        //wellcome
        if (guild.wellcome.enable == true && guild.wellcome.channelId != " ") {
            let channel = member.guild.channels.cache.get(guild.wellcome.channelId);
            if (!channel) return;
            const text = guild.wellcome.leave.text.replace('{user}', member.tag).replace('{server}', member.guild.name).replace('{count}', member.guild.members.cache.size)
            let embed = new MessageEmbed()
                .setColor("#eec4c6")
                .setTitle("Member left")
                .setThumbnail(member.user.displayAvatarURL())
                .setDescription(text)
            channel.send(embed);
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}