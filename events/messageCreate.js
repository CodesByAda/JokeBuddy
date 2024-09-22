const { Events, EmbedBuilder } = require('discord.js');
const { ownerid, prefix, wrong } = require('../config.json');
const util = require('util');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        //Not owner error msg
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();


        if (command === 'eval') {
            if (message.author.id !== ownerid) {
                const notOwnerEmbed = new EmbedBuilder()
                    .setDescription(`${wrong} You are not my owner buddy. Better luck next time.`)
                    .setColor('Red')

                return await message.channel.send({
                    embeds: [notOwnerEmbed]
                });
            } else {
                try {
                    const code = args.join(" ");
                    let evaled = eval(code);

                    // Check if the result is a promise, and await it if necessary
                    if (evaled instanceof Promise) {
                        evaled = await evaled;
                    }

                    // If result is not a string, convert it to string
                    if (typeof evaled !== "string") {
                        evaled = util.inspect(evaled, { depth: 0 });
                    }

                    // Send the result back, making sure it's under Discord's message length limit
                    message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
                } catch (err) {
                    // Send error message
                    await message.channel.send(`\`\`\`js\nError: ${err}\n\`\`\``);
                }
            }
        }
        if (command === 'uptime') {
            if (message.author.id !== ownerid) {
                const notOwnerEmbed = new EmbedBuilder()
                    .setDescription(`${wrong} You are not my owner buddy. Better luck next time.`)
                    .setColor('Red')

                return await message.channel.send({
                    embeds: [notOwnerEmbed]
                });
            } else {
                const days = Math.floor(message.client.uptime / 86400000);
                const hours = Math.floor(message.client.uptime / 3600000) % 24; // 1 Day = 24 Hours
                const minutes = Math.floor(message.client.uptime / 60000) % 60; // 1 Hour = 60 Minutes
                const seconds = Math.floor(message.client.uptime / 1000) % 60;

                const embed = new EmbedBuilder()
                    .setDescription(`I'm online for ${days}d ${hours}h ${minutes}m ${seconds}s.`)
                    .setColor('Random')

                await message.channel.send({
                    embeds: [embed]
                });
            }
        }
    }
};
