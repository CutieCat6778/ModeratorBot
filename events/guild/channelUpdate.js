module.exports = async (client, oldChannel, newChannel) => {
    if(oldChannel.type == "dm" || newChannel.type == "dm") return;
    const guild = await require('../../tools/getGuild')(client, newChannel.guild.id);
    let chanel = guild.channels.find(c => c.id == newChannel.id);
    if(!chanel) return;
    if (chanel && chanel.name.length > 5) return;
    else if (!chanel) {
        chanel.name = newChannel.name;
        chanel.id = newChannel.id;
    }else return;
    await guild.save();
}