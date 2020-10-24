const Guild = require("../models/guilds");
module.exports = async function getGuild(client, id) {
    const guild = await Guild.findOne({ guildId: id}).catch(e => require('./error')(e, undefined))
    if (!guild) {
        const guild = await require('./newGuild')(client, id);
        return guild
    }
    if (!guild.prefix) {
        guild.prefix = "mod";
        await guild.save();
        getGuild(id);
    }
    if (!guild.case) {
        guild.case = [];
        await guild.save();
        getGuild(id);
    }if (!guild.logs) {
        guild.case = {
            "id":" ", "enable": false, "token": " "
        }
        await guild.save();
        getGuild(id);
    }if(!guild.capcha) {
        guild.capcha = {
            "channels":[], "enable": false
        };
        await guild.save();
        getGuild(id);
    }if(!guild.textfilter) {
        guild.textfilter = {
            "enable": false, "whitelist": []
        };
        await guild.save();
        getGuild(id);
    }if(!guild.rules) {
        guild.textfilter = {"enable": false, "channelId":" ", "messageId": " " ,"rulesArr":[]};
        await guild.save();
        getGuild(id);
    }
    if(!guild.leveling){
        guild.leveling = {
            "enable": false, "rewards": {
                "enable": false, "roles": []
            }, "blacklist": {
                "channels":[],
                "roles":[]
            }, "levelUp": {
                "channelId": "", "enable": false, "text": ""
            },"users": []
        }
        await guild.save();
        getGuild(id);
    }
    return guild;
}