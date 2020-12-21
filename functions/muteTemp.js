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
        return require('../tools/sendMessage')(message, "The user is already get muted");
    }
    if (!target.roles.cache.has(muterole.id)) {
        await target.roles.add(muterole);
        require('../tools/sendMessage')(message, `Muted **${target.displayName}** for ${time}`);
    }
    client.setTimeout(() => {
        if (!target.roles.cache.has(muterole.id)) return;
        target.roles.remove(muterole);
        return require('../tools/sendMessage')(message, `**${target.displayName}** has been unmuted for ${time}`)
    }, require("ms")(time))
}

