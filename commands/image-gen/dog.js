const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tick, wrong } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Get one picture of a dog'),
    async execute(interaction) {
        const dogURL = 'https://dog.ceo/api/breeds/image/random';

        try {
            const res = await fetch(dogURL);
            if (!res.ok) throw new Error('Network response was not ok')

            const data = await res.json();
            const dogpic = data.message;

            const imageEmbed = new EmbedBuilder()
                .setColor('Blue')
                .setDescription('You buddy found one random dog picture!')
                .setImage(dogpic)
            interaction.reply({ embeds: [imageEmbed] });

        } catch (err) {
            console.log(err);
            const errorEmbed = new EmbedBuilder()
                .setDescription(`${wrong} Error occured. Couldn't generate image. Please try again`)
                .setColor('Red');

            await interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }



    },

}