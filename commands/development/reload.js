module.exports = {
    config: {
        name: "reload",
        aliases: ["loadcmd"],
        category: "development",
        perms: ["BOT_OWNER"]
    },
    async execute(client, message, args) {
        if (!args[0]) return;
        let commandName = args[0].toLowerCase()
        try {
            const commandfile = await client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
            delete require.cache[require.resolve(`../${commandfile.config.category}/${commandName}.js`)] // usage !reload <name>
            client.commands.delete(commandName)
            const pull = require(`../${commandfile.config.category}/${commandName}.js`)
            client.commands.set(commandName, pull)
            return message.channel.send("done")
        } catch (e) {
            return require('../../tools/error')(e, message);
        }

        message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)
    }
}