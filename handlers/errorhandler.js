const { EmbedBuilder } = require('discord.js');
const { error_channel } = require("../config.json")

module.exports = (client) => {

    // Function to send error logs to the specified error channel using embeds
    const logErrorToChannel = async (errorTitle, errorDescription) => {
        try {
            const channel = await client.channels.fetch(error_channel);
            if (channel && channel.isTextBased()) {
                const errorEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(errorTitle)
                    .setDescription(`\`\`\` ${errorDescription}\`\`\``)
                    .setTimestamp();

                channel.send({ embeds: [errorEmbed] });
            }
        } catch (fetchError) {
            console.error('Failed to log error to the channel:', fetchError);
        }
    };

    // Log API errors emitted by Discord.js
    client.on('error', async (error) => {
        console.error('The bot encountered an error:', error);
        await logErrorToChannel('API Error', error.message);
    });

    // Catch unhandled promise rejections
    process.on('unhandledRejection', async   (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        await logErrorToChannel('Unhandled Rejection', reason.toString());
    });

    // Catch uncaught exceptions (runtime errors)
    process.on('uncaughtException', async (error) => {
        console.error('There was an uncaught exception:', error);
        await logErrorToChannel('Uncaught Exception', error.message);
    });

    // Catch warning messages
    process.on('warning', async (warning) => {
        console.warn('Warning occurred:', warning);
        await logErrorToChannel('Warning', warning.message);
    });
};
