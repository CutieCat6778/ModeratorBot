module.exports = (client) => {
    try{
        const guild = client.guilds.cache.get("769862485053931521");
        guild.emojis.cache.map(e => client.emoje.get(e.id) ? null : client.emoje.set(e.name, `<${e.identifier}>`));
    }catch(e){
        console.log(e);
    }
}