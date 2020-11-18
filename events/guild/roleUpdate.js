module.exports = async (client, oldRole, newRole) => {
    try {
        const guild = await require('../../tools/getGuild')(client, newRole.guild.id);
        let role = guild.roles.find(c => c.id == newRole.id);
        if (role) {
            role.name = newRole.name;
            role.id = newRole.id;
            await guild.save();
        }
        if (guild.logs.enable == true) {
            if (guild.logs.id == " ") return;
            if (isNaN(guild.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            let mod = false;
            const hook = new WebhookClient(guild.logs.id, guild.logs.token)
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`Logger - Role ${oldRole.name} updated`)
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            if (oldRole.name != newRole.name) {
                embed.addField("Changed name", `\`${oldRole.name}\` => \`${newRole.name}\``)
                mod = true
            } if (oldRole.hexColor != newRole.hexColor) {
                embed.addField("Changed color", `\`${oldRole.hexColor}\` => \`${newRole.hexColor}\``)
                mod = true
            } if (oldRole.editable != newRole.editable) {
                embed.addField("Changed editable", `\`${oldRole.editable}\` => \`${newRole.editable}\``)
                mod = true
            } if (oldRole.editable != newRole.editable) {
                embed.addField("Changed editable", `\`${oldRole.editable}\` => \`${newRole.editable}\``)
                mod = true
            } if (oldRole.hoist != newRole.hoist) {
                embed.addField("Changed hoist", `\`${oldRole.hoist}\` => \`${newRole.hoist}\``)
                mod = true
            } if (oldRole.managed != newRole.managed) {
                embed.addField("Changed managed", `\`${oldRole.managed}\` => \`${newRole.managed}\``)
                mod = true
            } if (oldRole.mentionable != newRole.mentionable) {
                embed.addField("Changed mentionable", `\`${oldRole.mentionable}\` => \`${newRole.mentionable}\``)
                mod = true
            } if (oldRole.position != newRole.position) {
                embed.addField("Changed position", `\`${oldRole.position}\` => \`${newRole.position}\``)
                mod = true
            }
            if (hook && mod) {
                return hook.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined);
    }
}