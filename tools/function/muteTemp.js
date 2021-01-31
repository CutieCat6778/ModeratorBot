module.exports = async function temp(client, muterole, message, args, target) {
    let spaces = false;
    let time = args[0].toString();
    if (!require('ms')(time) || require('ms')(time) < 1000) {
        time = args.slice(0, 2).join("");
        spaces = !spaces;
    }
    if (!require("ms")(time)) return message.channel.send("Can't not parse the time, example (10s, 10m, 10h, 10d)");
    if (require("ms")(time) < 1000) return message.channel.send("The time can't be less then 1 second");
    let reason = spaces ? args.slice(3).join(" ") : args.slice(2).join(" ");
    if (!reason) reason = "No reason provided";
    if (target.roles.cache.has(muterole.id)) {
        return require('./sendMessage')(message, "The user is already get muted", true);
    }
    if (!target.roles.cache.has(muterole.id)) {
        await target.roles.add(muterole);
        require('./sendMessage')(message, `Muted **${target.displayName}** for ${time}`, true);
    }
    const channel = message.channel;
    const date = new Date()
    function f() {
        if (!target.roles.cache.has(muterole.id)) return;
        target.roles.remove(muterole);
        return channel.send(`**${target.displayName}** has been unmuted for ${time}`)
    }
    const obj = {
        type: 'mute',
        obj:{
            author: target.id,
            message: message.channel.id,
            args: [target.guild.id, muterole.id]
        },
        from: date.getTime().toString(),
        to: (date.getTime() + require("ms")(time)).toString(),
        function: f.toString()
    }
    await require('../database/newTimeout')(obj);
    client.setTimeout(f, require("ms")(time))
}

