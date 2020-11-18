module.exports = async (client, channel) => {
    try {
        if (channel.type != "text") return;
        const guild = await require('../../tools/getGuild')(client, channel.guild.id);
        let chanel = guild.channels.find(c => c.id == channel.id);
        if (!chanel) {
            chanel = {
                name: channel.name,
                id: channel.id
            }
            await guild.save();
        }
        const guild = client.guild.get(channel.guild.id);
        let muterole = channel.guild.roles.cache.find((r) => r.name === "Muted");
        if (!muterole) {
            try {
                muterole = await channel.guild.roles.create({
                    data: {
                        name: 'Muted',
                        color: '#000000',
                        permission: []
                    }
                });
            } catch (error) {
                require("../../tools/error")(error, undefined)
            }
        }
        await channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false,
            CONNECT: false
        });
        let vertifyrole = channel.guild.roles.cache.find((r) => r.name === "Unvertified");
        if (!vertifyrole) {
            vertifyrole = await channel.guild.roles.create({
                data: {
                    name: 'Unvertified',
                    color: '#000000',
                    permission: []
                }
            });
            if (channel.type == "dm" || channel.type == "category" || channel.type == "unknown") return;
        }
        await channel.createOverwrite(vertifyrole, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false,
            CONNECT: false
        });
        if (guild.logs.enable == true) {
            if (guild.logs.id == " ") return;
            if (isNaN(guild.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guild.logs.id, guild.logs.token)
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("Logger - Channel created")
                .addField("Channel", channel.name, true)
                .addField("Channel ID", channel.id, true)
                .addField("Channel type", channel.type, true)
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            if (hook) {
                return hook.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined);
    }
}