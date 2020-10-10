module.exports = async (client, oldChannel, newChannel) => {
    if(newChannel.type != "text" || oldChannel.type != "text") return;
    const guild = await require('../../tools/getGuild')(client, newChannel.guild.id);
    console.log(newChannel.id);
    let chanel = guild.channels.find(c => c.id == newChannel.id);
    console.log(chanel);
    if(!chanel) return;
    else if (chanel) {
        chanel.name = newChannel.name;
        chanel.id = newChannel.id;
    }else return;
    await guild.save();
}