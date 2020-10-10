module.exports = async(client, oldRole, newRole) => {
    const guild = await require('../../tools/getGuild')(client, newRole.guild.id);
    let role = guild.roles.find(c => c.id == newRole.id);
    if(!role) return;
    else if(channel) {
        role.name = newRole.channel.name;
        role.id = newRole.channel.id;
    }
    await guild.save();
}