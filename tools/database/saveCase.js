module.exports = async(target, message, cmd, reason) => {
    try{
        const guild = await require('./getGuild')(message.client, message.guild.id);
        const obj = {
            "name": cmd, "num": guild.case.length, "reason": reason ? reason : "No reason provieded", "author": message.author.id, "target": target.id, "time": new Date()
        }
        guild.case.push(obj);
        message.client.guild.get(message.guild.id).case = guild.case;
        await guild.save();
        return true;
    }catch(e) {
        return require('../function/error')(e, message);
    }
}