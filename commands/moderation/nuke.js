module.exports = {
    config: {
        name: "nuke",
        aliases: ["renew"],
        category: "moderation",
        perms: ["MANAGE_CHANNELS", "MANAGE_GUILD"]
    },
    async execute(client, message, args) {
        if (!args[0]) {
            message.channel.send("Are you sure that you want to nuke this channel ? [y/n]");
            const filter = (user) => user.id == message.author.id;
            const collected = await require('../../tools/collectMessage')(message, filter);
            switch (collected) {
                default:
                    return message.channel.send("Invalid options");
                case "y":
                    const oldChannel = message.channel;
                    const channel = await message.guild.channels.create(oldChannel.name, {
                        type: oldChannel.type, parent: oldChannel.parent.id
                    });
                    await channel.setParent(oldChannel.parent.id);
                    await channel.setPosition(oldChannel.position);
                    await oldChannel.delete();
                    //done
                    await channel.send("Nuked this channel");
                    return channel.send("https://i.pinimg.com/originals/cb/2f/28/cb2f28639fddb230cdf55fbaab48a046.gif");
                case "n":
                    return message.channel.send("Canceled");
            }
        } else if (args[0]) {
            const oldChannel = message.guild.channels.cache.get(await require('../../tools/mentions')(args[0]));
            if(!oldChannel) return message.channel.send("Channel not found");
            message.channel.send("Are you sure that you want to nuke this channel ? [y/n]");
            const filter = (user) => user.id == message.author.id;
            const collected = await require('../../tools/collectMessage')(message, filter);
            switch (collected) {
                default:
                    return message.channel.send("Invalid options");
                case "y":
                    const channel = await message.guild.channels.create(oldChannel.name, {
                        type: oldChannel.type, parent: oldChannel.parent.id
                    });
                    await channel.setParent(oldChannel.parent.id);
                    await channel.setPosition(oldChannel.position);
                    await oldChannel.delete();
                    //done
                    await channel.send("Nuked this channel");
                    return channel.send("https://i.pinimg.com/originals/cb/2f/28/cb2f28639fddb230cdf55fbaab48a046.gif");
                case "n":
                    return message.channel.send("Canceled");
            }
        }
    }
}