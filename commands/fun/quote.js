const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { tick, wrong } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Your buddy is here to get you a quote.But whats the purpouse?'),

    async execute(interaction) {
        const quoteUrl = 'https://quotes-api-self.vercel.app/quote';
        const errorEmbed = new EmbedBuilder()
            .setDescription(`${wrong} Sorry buddy, I couldn't find a joke. Please try again`)
            .setColor('Red');

        try {
            const res = await fetch(quoteUrl)
            const quote = await res.json();

            const quoteText = quote.quote;
            const quoteAuthor = quote.author;

            const quoteEmbed = new EmbedBuilder()
                .setTitle(quoteText)
                .setDescription(`~ ${quoteAuthor}`)
                .setColor('Random')

            await interaction.reply({
                embeds: [quoteEmbed]
            })

        } catch (error) {
            console.log(error);
            await interaction.reply({
                embed: [errorEmbed],
                ephemeral: true
            })
        };
    }
}