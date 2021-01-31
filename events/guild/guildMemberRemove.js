const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    try {
        let guild = await client.guild.get(member.guild.id);
        if(!guild) guild = await require("../../tools/database/getGuild")(client, member.guild.id)  
        if (guild.wellcome.enable == false) return;
        if (guild.wellcome.channelId == " " || isNaN(guild.wellcome.channelId) == true) return;
        //wellcome
        if (guild.wellcome.enable == true && guild.wellcome.channelId != " ") {
            let channel = member.guild.channels.cache.get(guild.wellcome.channelId);
            if (!channel) return;
            const text = guild.wellcome.leave.text.replace('{user}', member.user.tag).replace('{server}', member.guild.name).replace('{count}', member.guild.members.cache.size)
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("<:x_:774311089310662667> Member left")
                .setThumbnail(member.user.displayAvatarURL())
                .setDescription(text)
            channel.send(embed);
        }
    } catch (e) {
        return require("../../tools/function/error")(e, undefined)
    }
}