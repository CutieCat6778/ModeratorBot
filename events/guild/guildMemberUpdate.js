module.exports = async (client, statcord,  oldMember, newMember) => {
    try{
        if(!oldMember || !newMember) return;
        let guildCache = await client.guild.get(newMember.guild.id);
        if(!guildCache) guildCache = await require("../../tools/database/getGuild")(client, newMember.guild.id);
        if (guildCache.logs.enable == true) {
            if (guildCache.logs.id == " ") return;
            if (isNaN(guildCache.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
            let mod = false;
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`Logger - ${newMember.displayName} updated`)
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            if(oldMember.name != newMember.name){
                embed.addField("Changed name", `\`${oldMember.name}\` => \`${newMember.name}\``)
                mod = true
            }if(oldMember.bannable != newMember.bannable){
                embed.addField("Changed bannable", `\`${oldMember.bannable}\` => \`${newMember.bannable}\``)
                mod = true
            }if(oldMember.displayHexColor != newMember.displayHexColor){
                embed.addField("Changed display hex color", `\`${oldMember.displayHexColor}\` => \`${newMember.displayHexColor}\``)
                mod = true
            }if(oldMember.displayName != newMember.displayName){
                embed.addField("Changed display name ", `\`${oldMember.displayName}\` => \`${newMember.displayName}\``)
                mod = true
            }if(oldMember.kickable != newMember.kickable){
                embed.addField("Changed kickable ", `\`${oldMember.kickable}\` => \`${newMember.kickable}\``)
                mod = true
            }if(oldMember.manageable != newMember.manageable){
                embed.addField("Changed manageable ", `\`${oldMember.manageable}\` => \`${newMember.manageable}\``)
                mod = true
            }if(oldMember.nickname != newMember.nickname){
                embed.addField("Changed nickname ", `\`${oldMember.nickname}\` => \`${newMember.nickname}\``)
                mod = true
            }if(oldMember.partial != newMember.partial){
                embed.addField("Changed partial ", `\`${oldMember.partial}\` => \`${newMember.partial}\``)
                mod = true
            }if(oldMember.partial != newMember.partial){
                embed.addField("Changed partial ", `\`${oldMember.partial}\` => \`${newMember.partial}\``)
                mod = true
            }
            if (hook && mod) {
                return hook.send(embed);
            }
        }
    }catch(e) {
        return require("../../tools/function/error")(e, undefined);
    }
    
}