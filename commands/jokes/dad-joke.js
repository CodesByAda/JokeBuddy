const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dad-joke')
        .setDescription('Want to hear some dadjokes from your buddy?'),
    
    async execute(interaction) {
        await interaction.deferReply()
        const dadjokeUrl = `https://icanhazdadjoke.com/slack`;

        const response = await fetch(dadjokeUrl, {
            headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();
        
        const joke = data.attachments[0].text;
        const embed = new EmbedBuilder()
            .setDescription(joke)

        await interaction.editReply({
            embeds: [embed]
        })
    }
}