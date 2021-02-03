module.exports = {
    config: {
        name: "reload",
        aliases: ["loadcmd"],
        category: "development",
        perms: ["BOT_OWNER"]
    },
    async execute(client, message, args, guildCache) {
        if (!args[0]) return;
        let commandName = args[0].toLowerCase()
        try {
            if(commandName == "guild"){
                await require('../../tools/cache/guildCacheReload')(client);
                return messasge.channel.send("Done");
            }else if(client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))){
                const commandfile = await client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
                delete require.cache[require.resolve(`../${commandfile.config.category}/${commandName}.js`)] // usage !reload <name>
                client.commands.delete(commandName)
                const pull = require(`../${commandfile.config.category}/${commandName}.js`)
                client.commands.set(commandName, pull)
                return message.channel.send("done")
            }else return message.channel.send("Invalid options");
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}