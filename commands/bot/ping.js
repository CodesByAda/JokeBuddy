const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check my ping'),
        
    async execute(interaction) {
        const ping = `${Date.now() - interaction.createdTimestamp}ms`;
        await interaction.reply(`Message took ${ping}`);
    }
}