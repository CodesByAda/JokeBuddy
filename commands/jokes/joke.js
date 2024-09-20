const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { tick, wrong } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Your buddy will find a random joke (it can be Misc,Dark or Pun)')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Select a joke type. twopart or single line?')
                .setRequired(true)
                .addChoices(
                    { name: 'single', value: 'single' },
                    { name: 'twopart', value: 'twopart' },
                ),
        )
        .addIntegerOption(option =>
            option.setName('count')
                .setDescription('How many jokes you want?')
                .setMinValue(2)
                .setMaxValue(10)
                .setRequired(false),
        ),
        async execute(interaction) {
            const amount = interaction.options.getInteger('count') || 1;
            const type = interaction.options.getString('type');
    
            const jokeUrl = `https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=${type}&amount=${amount}`;
    
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
                        if (type === 'twopart') {
                            const setup = joke.setup;
                            const delivery = joke.delivery;
                            jokeMessage += `${index + 1} - **${setup}**\n${delivery}\n\n`;
                        } else {
                            jokeMessage += `${index + 1} - ${joke.joke}\n\n`;
                        }
                    });
                    jokesEmbed.setDescription(jokeMessage).setColor('Random');
                } else {
                    // Single joke handling
                    if (type === 'twopart') {
                        if (!result.setup || !result.delivery) {
                            throw new Error("No jokes found");
                        }
                        jokesEmbed.setDescription(`**${result.setup}**\n${result.delivery}\n\n`)
                            .setColor('Random');
                    } else {
                        if (!result.joke) {
                            throw new Error("No jokes found");
                        }
                        jokesEmbed.setDescription(result.joke)
                            .setColor('Random');
                    }
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
