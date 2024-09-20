const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { tick, wrong } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spooky-joke')
        .setDescription('Your buddy will find you one spooky joke'),
    async execute(interaction) {
        const amount = interaction.options.getInteger('count') || 1;

        const jokeUrl = `https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=${amount}`;

        const errorEmbed = new EmbedBuilder()
            .setDescription(`${wrong} Sorry buddy, I couldn't find a joke. Please try again`)
            .setColor('Red');

        try {
            const jokeSearch = await fetch(jokeUrl);
            const result = await jokeSearch.json();
            const jokesEmbed = new EmbedBuilder();
            let jokeMessage = '';

            //Multiple Jokes handling
            if (amount > 1) {
                if (!result.jokes || result.jokes.length === 0) {
                    throw new Error("No jokes found");
                }

                // Loop through jokes array
                result.jokes.forEach((joke, index) => {
                    const setup = joke.setup;
                    const delivery = joke.delivery;
                    jokeMessage += `${index + 1} - **${setup}**\n${delivery}\n\n`;
                });
                jokesEmbed.setDescription(jokeMessage).setColor('Random');
            } else {
                // Single joke handling
                if (!result.setup || !result.delivery) {
                    throw new Error("No jokes found");
                }
                jokesEmbed.setDescription(`**${result.setup}**\n${result.delivery}\n\n`)
                    .setColor('Random');

            }

            // Send the Joke
            await interaction.reply({
                embeds: [jokesEmbed]
            });

        } catch (error) {
            console.log(error);
            await interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }
    }
};
