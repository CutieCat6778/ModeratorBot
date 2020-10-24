module.exports = async(message, filter, time) => {
    obj = {
        max: 1
    }
    if(time) obj.time = time;
    const collected = await message.channel.awaitMessages(filter, obj);
    if(!collected) return message.channel.send("Didn't recived any messages");
    if (collected.first().content.toString().toLowerCase() == "cancel") return message.channel.send("Canceled");
    return collected.first().content;
}