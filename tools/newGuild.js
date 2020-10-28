const Guild = require('../models/guilds');

module.exports = async(client, g) => {
    const channels = [];
    const guild = client.guilds.cache.get(g)
    const guildData = await Guild.findOne({guildId: g});
    if(guildData) return;
    guild.channels.cache.forEach(channel => {
        if(channel.type != "text") return;
        const obj = {};
        obj.name = channel.name;
        obj.id = channel.id;
        channels.push(obj);
    })
    const roles = [];
    guild.roles.cache.forEach(role => {
        const obj = {};
        obj.name = role.name;
        obj.id = role.id;
        roles.push(obj);
    })
    const newGuild = new Guild({
        guildId: g,
        moderators: [],
        channels: channels,
        roles: roles,
        autorole: {
            roleId: " ", enable: false
        },
        wellcome: {
            "channelId": " ", "enable": false, "join":{
                "text": " ", "default": true
            },"leave":{
                "text": " ", "default": true
            }
        },
        warn: [],
        logs: {
            id: " ", enable: false, token: " "
        },
        prefix: "mod",
        case: [],
        capcha: {
            channels: [], enable: false
        },
        textfilter: {
            "enable": false,
            "badwords": {
                "whitelist": [], "blacklist": [], "enable": false
            }, "links": false, "cap": false
        },
        rules: { "enable": false, "channelId": " ", "messageId": " ", "rulesArr": [] }
    })
    guild.members.cache.map(u => {
        if(u.user.bot == false){
            if(u.permissions.has(["ADMINISTRATOR"]) || u.permissions.has("ADMINISTRATOR")) {
                newGuild.moderators.push(u.id);
            }
        }
    });
    await newGuild.save().catch(e => require('./error')(e, undefined))
    return newGuild;
}
