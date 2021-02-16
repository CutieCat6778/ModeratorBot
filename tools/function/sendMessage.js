module.exports = (message, text, boolen) => {
    if(!boolen){
        message.channel.send(`<@${message.author.id}>`).then(ping => {
            message.channel.send(text).then(async m => {
                await m.react("🗑️");
                const filter = (reaction, user) => {
                    return (reaction.emoji.name === '🗑️' && message.author.id == user.id) || (reaction.emoji.name === "🗑️" && message.member.permissions.has("ADMINISTRATOR"))
                };
                const collector = await m.createReactionCollector(filter, { time: 15000 });
                collector.on("collect", (reaction, user) => {
                    if (reaction.emoji.name == "🗑️") {
                        m.delete();
                        ping.delete();
                        return m;
                    }
                })
                collector.on('end', (reaction, user) => {
                    m.reactions.removeAll();
                    return m;
                })
            })
        })
    }else if(boolen){
        message.channel.send(text).then(async m => {
            await m.react("🗑️");
            const filter = (reaction, user) => {
                return (reaction.emoji.name === '🗑️' && message.author.id == user.id) || (reaction.emoji.name === "🗑️" && message.member.permissions.has("ADMINISTRATOR"))
            };
            const collector = await m.createReactionCollector(filter, { time: 15000 });
            collector.on("collect", (reaction, user) => {
                if (reaction.emoji.name == "🗑️" && user.id == message.author.id) {
                    m.delete();
                    return m;
                }
            })
            collector.on('end', (reaction, user) => {
                m.reactions.removeAll();
                return m;
            })
            return m;
        })
    }
}