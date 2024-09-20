const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Your buddy gets you a meme'),

    async execute(interaction) {
        const memeUrl = 'https://meme-api.com/gimme';
        const errorEmbed = new EmbedBuilder()
            .setDescription(`${wrong} Sorry buddy, I couldn't find a joke. Please try again`)
            .setColor('Red');
        try {
            const res = await fetch(memeUrl)
            const meme = await res.json();

            const memeImgUrl = meme.url;
            const memeTitle = meme.title;
            const postLink = meme.postLink;
            const memeAuthor = meme.author;
            const subReddit = meme.subreddit

            const memeEmbed = new EmbedBuilder()
                .setTitle(memeTitle)
                .setURL(postLink)
                .setColor('Random')
                .setImage(memeImgUrl)
                .setFooter({ text: `Author: ${memeAuthor} | subreddit: ${subReddit}` })

            await interaction.reply({
                embeds: [memeEmbed]
            });

        } catch (error) {
            console.log(error);
            await interaction.reply({
                embed: [errorEmbed],
                ephemeral: true
            });
        };
    }
}