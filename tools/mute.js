module.exports = function mute(client, time, target, muterole) {
    target.roles.add(muterole);
    client.setTimeout(() => {
        if(!target.roles.cache.has(muterole.id)) return;
        target.roles.remove(muterole);
        return `${target.displayName} has been unmuted for ${time}`
    }, require("ms")(time))
}