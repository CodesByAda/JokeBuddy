const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    client.commands = new Collection();

    const foldersPath = path.join(__dirname, '../commands');
    const commandFolder = fs.readdirSync(foldersPath);

    for (const folder of commandFolder) {

        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));;

        for (const file of commandFiles) {

            const filePath = path.join(commandsPath, file)
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }

    }
}


