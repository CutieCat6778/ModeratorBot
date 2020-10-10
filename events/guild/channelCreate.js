module.exports = async(client, channel) => {
    if(channel.type != "text") return;
    const guild = await require('../../tools/getGuild')(client, channel.guild.id);
    let chanel = guild.channels.find(c => c.id == channel.id);
    if(!chanel) return;
    else if(channel) {
        chanel.name = channel.name;
        chanel.id = channel.id;
    }
    await guild.save();
}