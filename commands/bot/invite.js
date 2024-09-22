const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { clientId } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get the link to invite the bot to your server'),

    async execute(interaction) {
        const permissions = 563347708046401; // Full admin permissions, you can adjust this as needed
        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;

        const inviteEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('Invite JokeBuddy to Your Server')
            .setDescription(`[Click here to invite JokeBuddy](${inviteLink})`)
            .setFooter({ text: 'We appreciate your support!' });

        await interaction.reply({ embeds: [inviteEmbed] });
    },
};
