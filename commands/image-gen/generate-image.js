const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tick, wrong } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate-image')
        .setDescription('AI Generated image according to your prompt')
        .setNSFW(true)
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Brief your idea.')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('hidden')
                .setDescription('Show this only for you or for everyone?')
                .setRequired(false)
        ),

    async execute(interaction) {
        try {
            const isEphemeral = interaction.options.getBoolean('hidden') || false;
            const prompt = interaction.options.getString('prompt');

            const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}`;

            await interaction.deferReply({ ephemeral: isEphemeral });

            const response = await fetch(imageUrl);
            if (!response || !response.ok) {
                const errorEmbed = new EmbedBuilder()
                    .setDescription(`${wrong} Error occurred. Couldn't generate image. Please try again.`)
                    .setColor('Red');

                return await interaction.editReply({
                    embeds: [errorEmbed],
                    ephemeral: isEphemeral
                });
            }

            const imageEmbed = new EmbedBuilder()
                .setImage(imageUrl)
                .setColor('Random')
                .setFooter({ text: 'Credit: pollinations.ai' });

            const tipEmbed = new EmbedBuilder()
                .setDescription("If you cant see the image, then that means i couldn't search for the specific image.")
                .setColor('Random')

            await interaction.editReply({
                embeds: [imageEmbed],
                ephemeral: isEphemeral
            });

            await interaction.followUp({
                embeds: [tipEmbed],
                ephemeral: true
            })

        } catch (err) {
            console.log(err);
            const errorEmbed = new EmbedBuilder()
                .setDescription(`${wrong} Error occurred. Couldn't generate that image.`)
                .setColor('Red');

            await interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }
    }
};
