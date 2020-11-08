module.exports = async function mute(muterole, message, args, target) {
    let reason = args.slice(1).join(" ");
    let text = `**${target.displayName}** has been muted for reason **${reason}**`;
    if (!reason) text = `**${target.displayName}** has been muted`;
    if (target.roles.cache.has(muterole.id)) return message.channel.send("The user is already muted");
    if (!target.roles.cache.has(muterole.id)) {
        await target.roles.add(muterole);
        message.channel.send(text)
    }
}
