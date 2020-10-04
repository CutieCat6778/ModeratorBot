module.exports = async (client, message) => {
    try {
        if (!message.content) return;
        await client.snipe.set(message.channel.id, {
            content: message.content,
            id: message.author.id,
            time: new Date()
        });
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
};