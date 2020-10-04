const Guild = require("../models/guilds");
module.exports = async function getGuild(message, nguild) {
    let id = " ";
    if(nguild && !message) id = nguild.id;
    else if (!nguild && message) id = message.guild.id;
    let guild = await Guild.findOne({ guildId: id})
    if (!guild) {
        const newGuild = new Guild({
            guildId: id,
            autorole: {
                roleId: " ", enable: false
            },
            wellcome: {
                channelId: " ", enable: false
            },
            warn: [],
            logs: {
                channelId: " ", enable: false
            },
            prefix: "neko",
            case: [],
            capcha: {
                channels: [], enable: false
            },
            textfilter: {
                enable: false, whitelist: []
            }
        })
        await newGuild.save();
        return getGuild(message);
    }
    if (!guild.prefix) {
        guild.prefix = "neko";
        await guild.save();
        getGuild(message);
    }
    if (!guild.case) {
        guild.case = [];
        await guild.save();
        getGuild(message);
    }if(!guild.capcha) {
        guild.capcha = {
            "channels":[], "enable": false
        };
        await guild.save();
        getGuild(message);
    }if(!guild.textfilter) {
        guild.textfilter = {
            "enable": false, "whitelist": []
        };
        await guild.save();
        getGuild(message);
    }
    return guild;
}