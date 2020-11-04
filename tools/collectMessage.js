module.exports = async(message, filter, time) => {
    obj = {
        max: 1
    }
    if(time) obj.time = time;
    const filte = m => m.author.id == message.author.id;
    const collected = await message.channel.awaitMessages(filte, obj);
    if(!collected) return message.channel.send("Didn't recived any messages");
    if (collected.toString().toLowerCase() == "cancel") return message.channel.send("Canceled");
    return collected;
}