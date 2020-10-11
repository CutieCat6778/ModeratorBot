const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Register")
        .setDescription(`The register command's aliases are : \`register\`, \`registe\` or \`registration\`\n
            **Registration**: \`${prefix} register\`
                Register and account on [process.env.name's website](https://process.env.name.ga)
            **Example**: 
            \`${prefix} register\`
        `)
    return embed;
}