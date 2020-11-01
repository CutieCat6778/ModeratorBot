const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Image searcher")
        .setDescription(`The image searcher command's aliases are : \`image\` or \`imgur\`\n
            **Get a image:** \`${prefix} image [something]\`
                Get a image example
            **Example**: 
            \`${prefix} define cats\`
        `)
    return embed;
}