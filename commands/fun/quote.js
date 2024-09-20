const { SlashCommandBuilder,EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Your buddy is here to get you a quote.But whats the purpouse?'),

    async execute(interaction) {
        const quoteUrl = 'https://quotes-api-self.vercel.app/quote';

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
                    content: 'Error occoured, Couldnt fetch a quote.',
                    ephemeral: true
                });
            };
    }
}