module.exports = {
    config: {
        name: "textfilter",
        aliases: ["badwords", "noswear"],
        category: "chat-management",
        perms: ["MANAGE_GUILD"]
    },
    async execute (client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/chat-management/textfilter")(client.guild.get(message.guild.id).prefix));
            }
            if (args[0] == "setup") {
                let guild = await require("../../tools/getGuild")(message);
                if (guild.textfilter.enable == true) return message.channel.send(`Please use command \`${client.guild.get(message.guild.id).prefix} textfilter setting\`, you are already setup the textfilter`)
                guild.textfilter.enable = true;
                await guild.save();
                client.guild.get(message.guild.id).textfilter = guild.textfilter;
                message.channel.send("All done !");
                if (client.guild.get(message.guild.id)) {
                    let guildCache = client.guild.get(message.guild.id);
                    if (guildCache.logs.enable == false) return;
                    if (guildCache.logs.channelId == " ") return;
                    if (isNaN(guildCache.logs.channelId == true)) return;
                    let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                    if (channel) {
                        return channel.send(require("../../logs/textfilter")(guild.textfilter));
                    }
                }
            } else if (args[0] == "setting") {
                if(!args[1]){
                    return message.reply(require("../../noArgs/chat-management/textfilter")(client.guild.get(message.guild.id).prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.textfilter.enable == true) return message.channel.send("You already enable it");
                    guild.textfilter.enable = true;
                    await guild.save();
                    client.guild.get(message.guild.id).textfilter = guild.textfilter;
                    message.channel.send("All done !");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.textfilter.enable == false) return message.channel.send("You already disable it");
                    guild.textfilter.enable = false;
                    await guild.save();
                    client.guild.get(message.guild.id).textfilter = guild.textfilter;
                    message.channel.send("All done !");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else {
                    let words = args.slice(1);
                    let guild = await require("../../tools/getGuild")(message);
                    if(guild.textfilter.whitelist.includes(words)) return message.channel.send("You already whitelisted the words");
                    await words.forEach(word => {
                        guild.textfilter.whitelist.push(word);
                    });
                    await guild.save();
                    client.guild.get(message.guild.id).textfilter = guild.textfilter;
                    message.channel.send("Added those word to whitelist word");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                }
            } else {
                return message.reply(require("../../noArgs/chat-management/textfilter")(client.guild.get(message.guild.id).prefix));
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}
