module.exports = (client, oldGuild, newGuild) => {
    const guildCache = client.guild.get(newGuild.id);
    if (guildCache.logs.enable == true) {
        if (guildCache.logs.id == " ") return;
        if (isNaN(guildCache.logs.id == true)) return;
        const { WebhookClient, MessageEmbed } = require('discord.js');
        const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
        let mod = false;
        const embed = new MessageEmbed()
            .setColor("#669fd2")
            .setTitle("Logger - Channel deleted")
            .setTimestamp(new Date())
            .setFooter(client.user.username, client.user.displayAvatarURL())
        if (oldGuild.name != newGuild.name) {
            embed.addField("Changed name", `\`${oldGuild.name}\` => \`${newGuild.name}\``)
            mod = true
        }if (oldGuild.afkChannel != newGuild.afkChannel) {
            embed.addField("Changed afkChannel", `\`${oldGuild.afkChannel.name}\` => \`${newGuild.afkChannel.name}\``)
            mod = true
        }if (oldGuild.afkTimeout != newGuild.afkTimeout) {
            embed.addField("Changed afkTimeout", `\`${require("ms")(oldGuild.afkTimeout, {long: true})}\` => \`${require("ms")(newGuild.afkTimeout, {long: true})}\``)
            mod = true
        }if (oldGuild.available != newGuild.embedEnabled) {
            embed.addField("Changed embedEnabled", `\`${oldGuild.embedEnabled}\` => \`${newGuild.embedEnabled}\``)
            mod = true
        }if (oldGuild.available != newGuild.embedEnabled) {
            embed.addField("Changed embedEnabled", `\`${oldGuild.embedEnabled}\` => \`${newGuild.embedEnabled}\``)
            mod = true
        }if (oldGuild.embedChannel != newGuild.embedChannel) {
            embed.addField("Changed embedChannel", `\`${oldGuild.embedChannel.name}\` => \`${newGuild.embedChannel.name}\``)
            mod = true
        }if (oldGuild.features != newGuild.features) {
            embed.addField("Changed features", `\`${oldGuild.features.toArray().join("\n").toLowerCase().split("_").join(" ")}\` => \`${newGuild.features.toArray().join("\n").toLowerCase().split("_").join(" ")}\``)
            mod = true
        }if (oldGuild.icon != newGuild.icon) {
            embed.addField("Changed icon", `\`[click here](${oldGuild.iconURL()})\` => \`[click here](${newGuild.iconURL()})\``)
            mod = true
        }if (oldGuild.large != newGuild.large) {
            embed.addField("Changed large", `\`${oldGuild.large}\` => \`${newGuild.large}\``)
            mod = true
        }if (oldGuild.maximumMembers != newGuild.maximumMembers) {
            embed.addField("Changed maximum members", `\`${oldGuild.maximumMembers}\` => \`${newGuild.maximumMembers}\``)
            mod = true
        }if (oldGuild.maximumPresences != newGuild.maximumPresences) {
            embed.addField("Changed maximum presences", `\`${oldGuild.maximumPresences}\` => \`${newGuild.maximumPresences}\``)
            mod = true
        }if (oldGuild.mfaLevel != newGuild.mfaLevel) {
            embed.addField("Changed mfa level", `\`${oldGuild.mfaLevel}\` => \`${newGuild.mfaLevel}\``)
            mod = true
        }if (oldGuild.owner != newGuild.owner) {
            embed.addField("Changed owner", `\`${oldGuild.owner.user.tag}\` => \`${oldGuild.owner.user.tag}\``)
            mod = true
        }if (oldGuild.partnered != newGuild.partnered) {
            embed.addField("Changed partnered", `\`${oldGuild.partnered}\` => \`${oldGuild.partnered}\``)
            mod = true
        }if (oldGuild.preferredLocale != newGuild.preferredLocale) {
            embed.addField("Changed preferred locale", `\`${oldGuild.preferredLocale}\` => \`${oldGuild.preferredLocale}\``)
            mod = true
        }if (oldGuild.premiumTier != newGuild.premiumTier) {
            embed.addField("Changed premium tier", `\`${oldGuild.premiumTier}\` => \`${oldGuild.premiumTier}\``)
            mod = true
        }if (oldGuild.publicUpdatesChannel != newGuild.publicUpdatesChannel) {
            embed.addField("Changed public updates channel", `\`${oldGuild.publicUpdatesChannel.name}\` => \`${oldGuild.publicUpdatesChannel.name}\``)
            mod = true
        }if (oldGuild.region != newGuild.region) {
            embed.addField("Changed region", `\`${oldGuild.region}\` => \`${oldGuild.region}\``)
            mod = true
        }if (oldGuild.rulesChannel != newGuild.rulesChannel) {
            embed.addField("Changed rules channel", `\`${oldGuild.rulesChannel.name}\` => \`${oldGuild.rulesChannel.name}\``)
            mod = true
        }if (oldGuild.systemChannel != newGuild.systemChannel) {
            embed.addField("Changed system channel", `\`${oldGuild.systemChannel.name}\` => \`${oldGuild.systemChannel.name}\``)
            mod = true
        }if (oldGuild.verificationLevel != newGuild.verificationLevel) {
            embed.addField("Changed verification level", `\`${oldGuild.verificationLevel}\` => \`${oldGuild.verificationLevel}\``)
            mod = true
        }if (oldGuild.verified != newGuild.verified) {
            embed.addField("Changed verified", `\`${oldGuild.verified}\` => \`${oldGuild.verified}\``)
            mod = true
        }if (oldGuild.widgetEnabled != newGuild.widgetEnabled) {
            embed.addField("Changed widget enabled", `\`${oldGuild.widgetEnabled}\` => \`${oldGuild.widgetEnabled}\``)
            mod = true
        }
        if (hook && mod) {
            return hook.send(embed);
        }
    }
}