const { Events, EmbedBuilder } = require('discord.js');
const { error_channel } = require('../config.json');

module.exports = {
    name: Events.GuildDelete,
    async execute(guild) {
        const channel = guild.client.channels.cache.get(error_channel) || await guild.client.channels.fetch(error_channel).catch(console.error);
        if (!channel) {
            console.log("Couldn't find logging channel");
            return;
        };

        const embed = new EmbedBuilder()
            .setTitle('Yo Buddy, So said that I just got kicked.')
            .setDescription(`**Server name:** ${guild.name}\n**Server id:** ${guild.id}\n**Owner id:** ${guild.ownerId}\n**Total members:** ${guild.memberCount}`)
            .setColor('Red')
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setFooter({ text: `Left on: ${new Date().toLocaleDateString()}` })

        await channel.send({
            embeds: [embed]
        });
    }
};
