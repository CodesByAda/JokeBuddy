const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const memeChoiceArr = require('../../utils/memeChoice');
const { tick, wrong } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate-meme')
        .setDescription("Generate a meme according to your text")
        .addStringOption(option =>
            option.setName('image-name')
                .setDescription('Enter the meme image name (Choose from the auto-complete (Use CamelCase) or visit apimeme.com)')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option.setName('top-text')
                .setDescription('Enter the text to show at the top of the image')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('bottom-text')
                .setDescription('Enter the text to show at the bottom of the image')
                .setRequired(false)
        ),

    // Autocomplete handler
    async autocomplete(interaction) {
        try {
            const focusedValue = interaction.options.getFocused();
            const filteredChoice = memeChoiceArr
                .filter(choice => choice.includes(focusedValue)).slice(0, 25);

            await interaction.respond(
                filteredChoice.map(choice =>
                    ({ name: choice, value: choice.replace(/ /g, '-') })
                )
            );
        } catch (err) {
            console.log(err);
        }

    },

    // Command execution
    async execute(interaction) {
        try {
            const imgName = interaction.options.getString('image-name');
            let topText = interaction.options.getString('top-text') || '';
            let bottomText = interaction.options.getString('bottom-text') || '';

            let memeUrl = `https://apimeme.com/meme?meme=${encodeURIComponent(imgName)}&top=${encodeURIComponent(topText)}&bottom=${encodeURIComponent(bottomText)}`;

            if (!memeChoiceArr.includes(imgName)) {
                const errorEmbed = new EmbedBuilder()
                    .setDescription(`${wrong} Invalid meme image name. Please choose from the auto-complete list or check apimeme.com.`)
                    .setColor('Red');

                return await interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
            }

            const memeEmbed = new EmbedBuilder()
                .setImage(memeUrl)
                .setFooter({ 'text': 'Image credits: apimeme.com' })
                .setColor('Random')

            await interaction.reply({
                embeds: [memeEmbed],
                ephemeral: false
            });
        } catch (err) {
            console.log(err);
            const errorEmbed = new EmbedBuilder()
                .setDescription(`${wrong} Error occured. Couldn't generate meme. Please try again`)
                .setColor('Red');

            await interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }

    },
};
