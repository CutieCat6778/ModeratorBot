const weather = require('openweather-apis');
const { MessageEmbed } = require("discord.js");
weather.setLang('en');
weather.setAPPID(process.env.weather);
weather.setUnits('metric');

module.exports = {
    config: {
        name: 'weather',
        aliases: ["wether"],
        category: "api",
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) return message.channel.send('Please supply a city/country name!');
            weather.setCity(args.slice(0).join(" "));
            weather.getAllWeather(function (err, result) {
                if (result.cod && result.cod == '404') return message.channel.send(result.message);
                let embed = new MessageEmbed()
                    .setColor("#669fd2")
                    .setTitle(result.name)
                    .setDescription(result.weather[0].main + " - " + result.weather[0].description)
                    .addField("Visibility", result.visibility / 1000 + "km", true)
                    .addField("Temperature", result.main.temp + "°C", true)
                    .addField("Pressure", result.main.pressure + "P", true)
                    .addField("Humidity", result.main.humidity + "%", true)
                    .addField("Wind", result.wind.speed + "km/h", true)
                    .addField("Cloud", result.clouds.all + "%", true)
                    .setTimestamp()
                message.channel.send(embed);
            });
        } catch (e) {
            require("../../tools/error")(e, message)
        }
    }
}