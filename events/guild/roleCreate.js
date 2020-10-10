module.exports = async(client, role) => {
    const guild = await require('../../tools/getGuild')(client, role.guild.id);
    let chanel = guild.roles.find(c => c.id == role.id);
    if(!chanel) return;
    else if(channel) {
        chanel.name = role.name;
        chanel.id = role.id;
    }
    await guild.save();
}