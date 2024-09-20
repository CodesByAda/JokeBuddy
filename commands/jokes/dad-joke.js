const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { tick, wrong } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dad-joke')
        .setDescription('Want to hear some dadjokes from your buddy?'),

    async execute(interaction) {
        await interaction.deferReply()
        const dadjokeUrl = `https://icanhazdadjoke.com/slack`;

        const errorEmbed = new EmbedBuilder()
            .setDescription(`${wrong} Sorry buddy, I couldn't find a joke. Please try again`)
            .setColor('Red');

        try {
            const response = await fetch(dadjokeUrl, {
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();
            const joke = data.attachments[0].text;
            const jokeEmbed = new EmbedBuilder()
                .setDescription(joke)

            await interaction.editReply({
                embeds: [jokeEmbed]
            });
        } catch (error) {
            console.log(error);
            await interaction.reply({
                embed: [errorEmbed],
                ephemeral: true
            });
        }

    }
}