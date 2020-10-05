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
            prefix: "shino",
            case: [],
            capcha: {
                channels: [], enable: false
            },
            textfilter: {
                enable: false, whitelist: []
            },
            rules: {"channelId":" ", "messageId": " " ,"rulesArr":[]}
        })
        await newGuild.save();
        return getGuild(message);
    }
    if (!guild.prefix) {
        guild.prefix = "shino";
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
    }if(!guild.rules) {
        guild.textfilter = {"channelId":" ", "messageId": " " ,"rulesArr":[]};
        await guild.save();
        getGuild(message);
    }
    return guild;
}