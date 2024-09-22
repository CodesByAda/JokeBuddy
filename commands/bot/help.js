const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides information about the available bot commands'),

    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('JokeBuddy Commands')
            .setDescription('Here is a list of all the available commands grouped by category:')
            .addFields(
                { name: '🤖 Bot Commands', value: '`/help`, `/invite`, `/ping`' },
                { name: '🖼️ Image Generation', value: '`/dog`, `/generate-image`, `/generate-meme` \n`Since /generate-image produces NSFW content, this command works in NSFW channel only.Use at your own risk`' },
                { name: '😂 Joke Commands', value: '`/christmas-joke`, `/dad-joke`, `/joke`, `/meme`, `/spooky-joke`, `/quote`' }
            )
            .setFooter({ text: 'Use / before each command' });

        await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
    },
};
