const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    try {
        let guild = await client.guild.get(member.guild.id);
        if(!guild) guild = await require("../../tools/database/getGuild")(client, member.guild.id)  
        if (guild.welcome.enable == false) return;
        if (guild.welcome.channelId == " " || isNaN(guild.welcome.channelId) == true) return;
        //welcome
        if (guild.welcome.enable == true && guild.welcome.channelId != " ") {
            let channel = member.guild.channels.cache.get(guild.welcome.channelId);
            if (!channel) return;
            const text = guild.welcome.leave.text.replace('{user}', member.user.tag).replace('{server}', member.guild.name).replace('{count}', member.guild.members.cache.size)
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