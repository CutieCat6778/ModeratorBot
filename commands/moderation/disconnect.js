const send = require('../../tools/function/sendMessage');

module.exports = {
    config: {
        name: "disconnect",
        perms: ['MANAGE_CHANNELS', 'MANAGE_GUILD'],
        bot: ['MANAGE_GUILD'],
        category: "moderation",
        aliases: ['vcdc', 'voicedc']
    },
    async execute(client, message, args, guildCache) {
        if (!args[0]) {
            return send(message, require(`../../noArgs/${this.config.category}/${this.config.name}.js`)(guildCache.prefix))
        } else if (args[0]) {
            const id = require('mention-converter')(args[0]);
            if (!id) return message.channel.send('Invalid mentions string!');
            else if (id) {
                const user = message.guild.members.cache.get(id);
                if (!user) return message.channel.send('User not found!');
                else if (user) {
                    const voice = user.voice;
                    if (!voice) return message.channel.send('That user not in voice channel');
                    if (user.permissions.has(['MANAGE_GUILD', 'ADMINISTRATOR'])) return message.channel.send(require('../../tools/function/permissionMissMe')('I don\'t have enought permissions to disconnect him/her from voice!'));
                    else if (!user.permissions.has(['MANAGE_GUILD', 'ADMINISTRATOR'])) {
                        if (voice.deaf) return message.channel.send('That user is already voicemuteed!');
                        else if (!voice.deaf) {
                            let reason = args.slice(1).join(" ");
                            if(!reason) reason = "No reason provieded";
                            voice.kick(reason);
                            require('../../tools/function/sendMessage')(message, `Successfully voicemuteed **${user.displayName}**!!!`, false);
                            if (guildCache) {
                                if (guildCache.logs.enable == false) return;
                                if (guildCache.logs.id == " ") return;
                                if (isNaN(guildCache.logs.id == true)) return;
                                let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                                if (channel) {
                                    let embed = await require("../../logs/logs")(user, this.config.name, message, reason, client);
                                    return channel.send(embed);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            return send(require(`../../noArgs/${this.config.category}/${this.config.name}.js`)(guildCache.prefix))
        }
    }
}