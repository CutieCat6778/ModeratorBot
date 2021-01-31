module.exports = {
    config: {
        name: "nuke",
        aliases: ["renew"],
        category: "moderation",
        perms: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
        bot: ["MANAGE_CHANNELS"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                message.channel.send("Are you sure that you want to nuke this channel ? [y/n]");
                const filter = (user) => user.id == message.author.id;
                let collected = await require('../../tools/function/collectMessage')(message, filter);
                switch (collected.content.toLowerCase()) {
                    default:
                        return message.channel.send("Invalid options");
                    case "y":
                        const oldChannel = message.channel;
                        const obj = {
                            type: oldChannel.type
                        }
                        if(oldChannel.parent){
                            obj.parent = oldChannel.parent.id
                        }
                        const channel = await message.guild.channels.create(oldChannel.name, obj);
                        obj.parent ? await channel.setParent(oldChannel.parent.id) : null
                        await channel.setPosition(oldChannel.position);
                        await oldChannel.delete();
                        //done
                        await channel.send("Nuked this channel");
                        return channel.send("https://i.pinimg.com/originals/cb/2f/28/cb2f28639fddb230cdf55fbaab48a046.gif");
                    case "n":
                        return message.channel.send("Canceled");
                }
            } else if (args[0]) {
                const oldChannel = message.guild.channels.cache.get(await require('../../tools/string/mentions')(args[0]));
                if (!oldChannel) return message.channel.send("Channel not found");
                message.channel.send("Are you sure that you want to nuke this channel ? [y/n]");
                const filter = (user) => user.id == message.author.id;
                let collected = await require('../../tools/function/collectMessage')(message, filter);
                switch (collected.content) {
                    default:
                        return message.channel.send("Invalid options");
                    case "y":
                        const obj = {
                            type: oldChannel.type
                        }
                        if(oldChannel.parent){
                            obj.parent = oldChannel.parent.id
                        }
                        const channel = await message.guild.channels.create(oldChannel.name, obj);
                        obj.parent ? await channel.setParent(oldChannel.parent.id) : null
                        await channel.setPosition(oldChannel.position);
                        await oldChannel.delete();
                        //done
                        await channel.send("Nuked this channel");
                        return channel.send("https://i.pinimg.com/originals/cb/2f/28/cb2f28639fddb230cdf55fbaab48a046.gif");
                    case "n":
                        return message.channel.send("Canceled");
                }
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}