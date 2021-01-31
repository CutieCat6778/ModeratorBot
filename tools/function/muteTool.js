module.exports = async function mute(client, time, target, muterole) {
    if(!target.roles.cache.has(muterole.id)){
        target.roles.add(muterole);
        const date = new Date()
        function f() {
            if(target.roles.cache.has(muterole.id)){
                target.roles.remove(muterole);
                return `**${target.displayName}** has been unmuted for ${time}`
            }else return undefined;
        }
        const obj = {
            type: 'mute',
            obj:{
                author: target.id,
                message: undefined,
                args: [target.guild.id, muterole.id]
            },
            from: date.getTime().toString(),
            to: (date.getTime() + require("ms")(time)).toString(),
            function: f.toString()
        }
        await require('../database/newTimeout')(obj);
        client.setTimeout(f, require("ms")(time))
    }
}